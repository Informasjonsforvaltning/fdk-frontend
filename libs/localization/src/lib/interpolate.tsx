import React from "react";

const PLACEHOLDER_REGEX = /{{\s*([^{}\s]+)\s*}}/g;

/**
 * Interpolates values into a string containing placeholders {{key}}.
 *
 * Returns a plain string when every value is a string or number,
 * and a React element when any value is React content.
 * Unknown placeholders are replaced with an empty string.
 *
 * @param str - The string containing placeholders (e.g. "{{count}} results")
 * @param params - Key-value pairs for interpolation (e.g. { count: 5 })
 */
export function interpolate(str: string, params: Record<string, string | number>): string;
export function interpolate(str: string, params: Record<string, React.ReactNode>): React.ReactElement;
export function interpolate(str: string, params: Record<string, React.ReactNode>): string | React.ReactElement {
  const isPlain = Object.values(params).every((value) => typeof value === "string" || typeof value === "number");

  if (isPlain) {
    return str.replace(PLACEHOLDER_REGEX, (_, key: string) => {
      const value = params[key];
      return value === undefined || value === null ? "" : String(value);
    });
  }

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  PLACEHOLDER_REGEX.lastIndex = 0;
  while ((match = PLACEHOLDER_REGEX.exec(str)) !== null) {
    const key = match[1];
    parts.push(str.slice(lastIndex, match.index));
    parts.push(<React.Fragment key={key}>{params[key]}</React.Fragment>);
    lastIndex = PLACEHOLDER_REGEX.lastIndex;
  }

  parts.push(str.slice(lastIndex));
  return <>{parts}</>;
}
