"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Pagination, usePagination } from "@digdir/designsystemet-react";
import {
  buildSearchPageUrlFromSearchParams,
  toApiPage,
  toDisplayPage,
  type SearchPageInfo,
} from "@fdk-frontend/ui/search-form";
import { interpolate } from "@fdk-frontend/localization";

import styles from "./search-page.module.scss";

export type SearchPaginationDictionary = {
  previous: string;
  next: string;
  pageAriaLabel: string;
};

export type SearchPaginationProps = {
  page: SearchPageInfo;
  dictionary: SearchPaginationDictionary;
};

const SearchPagination = function ({ page, dictionary }: SearchPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const displayPage = toDisplayPage(page.currentPage);
  const totalPages = Math.max(page.totalPages, 1);

  const navigate = useCallback(
    (nextPage: number) => {
      const url = buildSearchPageUrlFromSearchParams(pathname, searchParams, {
        page: nextPage,
      });
      router.replace(url);
    },
    [pathname, router, searchParams],
  );

  const { pages, prevButtonProps, nextButtonProps } = usePagination({
    currentPage: displayPage,
    totalPages,
    onChange: (_event, nextDisplayPage) => {
      navigate(toApiPage(nextDisplayPage));
    },
  });

  if (page.totalElements === 0) return null;

  return (
    <div className={styles.pagination}>
      {totalPages > 1 && (
        <Pagination>
          <Pagination.List>
            <Pagination.Item>
              <Pagination.Button {...prevButtonProps}>{dictionary.previous}</Pagination.Button>
            </Pagination.Item>
            {pages.map(({ page: pageNumber, itemKey, buttonProps }) =>
              typeof pageNumber === "number" && buttonProps ? (
                <Pagination.Item key={itemKey}>
                  <Pagination.Button
                    {...buttonProps}
                    aria-label={interpolate(dictionary.pageAriaLabel, { page: pageNumber })}
                  >
                    {pageNumber}
                  </Pagination.Button>
                </Pagination.Item>
              ) : (
                <Pagination.Item
                  key={itemKey}
                  aria-hidden
                >
                  …
                </Pagination.Item>
              ),
            )}
            <Pagination.Item>
              <Pagination.Button {...nextButtonProps}>{dictionary.next}</Pagination.Button>
            </Pagination.Item>
          </Pagination.List>
        </Pagination>
      )}
    </div>
  );
};

export default SearchPagination;
