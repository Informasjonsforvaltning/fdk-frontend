import fs from 'node:fs/promises';
import path from 'node:path';
import { NextResponse, type NextRequest } from 'next/server';
import type { LocaleCodes } from '@fdk-frontend/localization';

type DocsSearchResult = {
  id: string;
  title: string;
  summary: string;
  url: string;
  locale: LocaleCodes;
  updated?: string;
};

type DocsIndexEntry = DocsSearchResult & {
  content: string;
};

let docsIndex: DocsIndexEntry[] | null = null;
let docsIndexPromise: Promise<DocsIndexEntry[]> | null = null;

const SUPPORTED_LOCALES: LocaleCodes[] = ['nb', 'nn', 'en'];

const isSupportedLocale = (value: string | null): value is LocaleCodes => {
  return SUPPORTED_LOCALES.includes(value as LocaleCodes);
};

const collectMdxFiles = async (directory: string): Promise<string[]> => {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectMdxFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }

  return files;
};

const extractFrontmatterBlock = (source: string): string | undefined => {
  if (!source.startsWith('---')) return undefined;
  const end = source.indexOf('\n---', 3);
  if (end === -1) return undefined;
  return source.slice(3, end).trim();
};

const extractFrontmatterField = (frontmatter: string | undefined, field: string): string | undefined => {
  if (!frontmatter) return undefined;
  const regex = new RegExp(`^${field}:\\s*["']?(.+?)["']?\\s*$`, 'm');
  const match = frontmatter.match(regex);
  return match?.[1]?.trim();
};

const stripTagsAndWhitespace = (value: string): string => {
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
};

const extractIngress = (source: string): string | undefined => {
  const match = source.match(/<Ingress[^>]*>([\s\S]*?)<\/Ingress>/);
  if (!match) return undefined;
  return stripTagsAndWhitespace(match[1]);
};

const extractLocaleFromFilename = (filename: string): LocaleCodes | undefined => {
  const match = filename.match(/\.([a-z]{2})\.mdx$/);
  if (!match) return undefined;
  const candidate = match[1];
  return isSupportedLocale(candidate) ? candidate : undefined;
};

const buildUrlFromFile = (publicDir: string, filePath: string, locale: LocaleCodes): string | undefined => {
  const contentRoot = path.join(publicDir, 'content');
  if (!filePath.startsWith(contentRoot)) {
    return undefined;
  }

  const relative = path.relative(contentRoot, filePath);
  const segments = relative.split(path.sep);
  if (segments.length === 0) return undefined;

  const filename = segments.pop() as string;
  const nameMatch = filename.match(/^(.+)\.[a-z]{2}\.mdx$/);
  if (!nameMatch) return undefined;

  const pageName = nameMatch[1];
  const rootContentDirectory = segments[0];
  if (!rootContentDirectory) return undefined;

  const slugSegments = segments.slice(1);
  if (pageName !== rootContentDirectory) {
    slugSegments.push(pageName);
  }

  const urlPathSegments = [rootContentDirectory, ...slugSegments];
  return `/${locale}/${urlPathSegments.join('/')}`;
};

const buildDocsIndex = async (): Promise<DocsIndexEntry[]> => {
  const publicDir = path.join(process.cwd(), 'public');
  const allMdxFiles = await collectMdxFiles(publicDir);

  const entries: DocsIndexEntry[] = [];

  for (const filePath of allMdxFiles) {
    const fileName = path.basename(filePath);
    const locale = extractLocaleFromFilename(fileName);
    if (!locale) continue;

    const url = buildUrlFromFile(publicDir, filePath, locale);
    if (!url) continue;

    const source = await fs.readFile(filePath, 'utf8');
    const frontmatterBlock = extractFrontmatterBlock(source);

    const titleFromFrontmatter = extractFrontmatterField(frontmatterBlock, 'title');
    const descriptionFromFrontmatter = extractFrontmatterField(frontmatterBlock, 'description');
    const ingress = extractIngress(source);

    const title = titleFromFrontmatter ?? path.parse(fileName).name;
    const summary = ingress ?? descriptionFromFrontmatter ?? '';

    const stat = await fs.stat(filePath);
    const updated = stat.mtime.toISOString();

    entries.push({
      id: url,
      title,
      summary,
      url,
      locale,
      updated,
      content: stripTagsAndWhitespace(source),
    });
  }

  return entries;
};

const getDocsIndex = async (): Promise<DocsIndexEntry[]> => {
  if (docsIndex) return docsIndex;
  if (!docsIndexPromise) {
    docsIndexPromise = buildDocsIndex().then((built) => {
      docsIndex = built;
      return built;
    });
  }
  return docsIndexPromise;
};

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const rawQuery = searchParams.get('q') ?? '';
  const rawLang = searchParams.get('lang');
  const page = Number.parseInt(searchParams.get('page') ?? '0', 10);
  const size = Number.parseInt(searchParams.get('size') ?? '10', 10);

  const query = rawQuery.trim();
  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const locale: LocaleCodes = isSupportedLocale(rawLang) ? rawLang : 'nb';

  const index = await getDocsIndex();
  const qLower = query.toLowerCase();

  const matches = index.filter((entry) => {
    if (entry.locale !== locale) return false;
    const haystack = `${entry.title} ${entry.summary} ${entry.content}`.toLowerCase();
    return haystack.includes(qLower);
  });

  const start = Math.max(page, 0) * Math.max(size, 1);
  const end = start + Math.max(size, 1);
  const pageOfResults = matches.slice(start, end).map(({ content, ...result }) => result);

  return NextResponse.json({ results: pageOfResults });
};

