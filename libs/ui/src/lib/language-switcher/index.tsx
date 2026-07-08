"use client";

import { useRouter, usePathname } from "next/navigation";
import React from "react";
import { ToggleGroup } from "@digdir/designsystemet-react";

import { getLocalization, i18n, LocaleCodes } from "@fdk-frontend/localization";

import styles from "./language-switcher.module.scss";

type LanguageSwitcherProps = {
  loc?: LocaleCodes;
} & React.HTMLAttributes<HTMLDivElement>;

const LanguageSwitcher = ({ loc, ...props }: LanguageSwitcherProps) => {
  const router = useRouter();
  const pathName = usePathname();

  const defaultCode = pathName.split("/")[1];

  const onLanguageSelect = (code: LocaleCodes) => {
    const url = new URL(window.location.href);
    const segments = url.pathname.split("/");
    segments[1] = code;
    url.pathname = segments.join("/");
    router.replace(url.toString());
  };

  return (
    <nav {...props}>
      <ToggleGroup
        className={styles.languageSwitcher}
        defaultValue={defaultCode}
        onChange={(code) => onLanguageSelect(code as LocaleCodes)}
        data-size="sm"
        data-toggle-group={loc ? getLocalization(loc).common.footer.languageToggleGroup : "select language"}
      >
        {i18n.locales.map((locale) => (
          <ToggleGroup.Item
            value={locale.code}
            key={locale.code}
          >
            {locale.name}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup>
    </nav>
  );
};

export default LanguageSwitcher;
