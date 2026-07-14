"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { ToggleGroup } from "@digdir/designsystemet-react";

import { getLocalization, i18n, LocaleCodes } from "@fdk-frontend/localization";

import styles from "./language-switcher.module.scss";

const SCROLL_STORAGE_KEY = "fdk-language-switch-scroll";

type LanguageSwitcherProps = {
  loc?: LocaleCodes;
} & React.HTMLAttributes<HTMLDivElement>;

const LanguageSwitcher = ({ loc, ...props }: LanguageSwitcherProps) => {
  const router = useRouter();
  const pathName = usePathname();

  const defaultCode = pathName.split("/")[1];

  // Changing the [lang] segment resets scroll to top even with `scroll: false`,
  // which throws the user away from the footer where this switcher lives. Restore
  // the previous scroll position after the language navigation renders.
  useEffect(() => {
    const saved = sessionStorage.getItem(SCROLL_STORAGE_KEY);
    if (saved === null) return;
    sessionStorage.removeItem(SCROLL_STORAGE_KEY);

    const targetY = parseInt(saved, 10);
    let frames = 0;
    const restore = () => {
      window.scrollTo(0, targetY);
      if (Math.abs(window.scrollY - targetY) > 2 && frames++ < 30) {
        requestAnimationFrame(restore);
      }
    };
    requestAnimationFrame(restore);
  }, [pathName]);

  const onLanguageSelect = (code: LocaleCodes) => {
    const url = new URL(window.location.href);
    const segments = url.pathname.split("/");
    segments[1] = code;
    url.pathname = segments.join("/");
    sessionStorage.setItem(SCROLL_STORAGE_KEY, String(window.scrollY));
    router.replace(`${url.pathname}${url.search}${url.hash}`, { scroll: false });
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
