import { PropsWithChildren } from "react";
import { lang } from "next/root-params";
import { Header } from "@fdk-frontend/ui";
import { i18n, type LocaleCodes } from "@fdk-frontend/localization";
import styles from "./error-page.module.scss";

const isLocaleCode = (value: string): value is LocaleCodes => i18n.locales.some((locale) => locale.code === value);

export const getRequestLocale = async (): Promise<LocaleCodes> => {
  const locale = await lang();
  return isLocaleCode(locale) ? locale : i18n.defaultLocale;
};

export default async function ErrorPage({ children }: PropsWithChildren) {
  const locale = await getRequestLocale();
  return (
    <>
      <Header
        locale={locale}
        frontpage
        showSearchInput
        catalogPortalBaseUri={process.env.CATALOG_PORTAL_BASE_URI ?? ""}
        adminGuiBaseUri={process.env.ADMIN_GUI_BASE_URI ?? ""}
      />
      <main
        id="main"
        className={styles.errorPage}
      >
        <div className={styles.inner}>{children}</div>
      </main>
    </>
  );
}
