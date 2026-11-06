import cn from "classnames";

import { PropsWithChildren } from "react";

import { Drawer, DrawerPanel, DrawerToggleButton, DynamicBreadcrumbs } from "@fdk-frontend/ui";
import { type LocaleCodes, getLocalization } from "@fdk-frontend/localization";
import { MenuHamburgerIcon } from "@navikt/aksel-icons";

import Sidebar from "../sidebar";
import TableOfContents from "../table-of-contents";

import pageStyles from "./mdx-page.module.scss";

import { extractHeadlines, type MdxHeadlineObjectNode } from "./utils";

export type MdxPageProps = PropsWithChildren & {
  currentPath: string[];
  locale: LocaleCodes;
  source: string;
  sidebars?: boolean;
};

const MdxPage = async ({ children, sidebars = true, currentPath, locale, source }: MdxPageProps) => {
  const loc = getLocalization(locale);
  const docsDictionary = loc.docs;

  const headlines: MdxHeadlineObjectNode[] = extractHeadlines(source);
  const menuLabel = docsDictionary.sidebar.menuLabel;

  return (
    <div className={pageStyles.mdxPage}>
      <DynamicBreadcrumbs
        docsDictionary={docsDictionary}
        locale={locale}
      />
      <div className={cn(pageStyles.content, { [pageStyles.noSidebars]: !sidebars })}>
        {sidebars && (
          <div className={pageStyles.leftColumn}>
            <div className={pageStyles.asideContent}>
              <Sidebar
                dictionary={docsDictionary}
                currentPath={currentPath}
                locale={locale}
              />
            </div>
          </div>
        )}
        <div className={pageStyles.mainColumn}>
          {sidebars && (
            <Drawer
              side="left"
              closeOnChange={currentPath.join("/")}
              className={pageStyles.menuDrawer}
            >
              <DrawerToggleButton
                variant="secondary"
                aria-label={menuLabel}
              >
                <MenuHamburgerIcon aria-hidden />
                {menuLabel}
              </DrawerToggleButton>
              <DrawerPanel aria-label={menuLabel}>
                <Sidebar
                  dictionary={docsDictionary}
                  currentPath={currentPath}
                  locale={locale}
                />
              </DrawerPanel>
            </Drawer>
          )}
          <article className={pageStyles.article}>
            {children}
          </article>
        </div>
        {sidebars && (
          <div className={pageStyles.rightColumn}>
            <div className={pageStyles.asideContent}>
              <TableOfContents
                dictionary={docsDictionary}
                headlines={headlines}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MdxPage;
