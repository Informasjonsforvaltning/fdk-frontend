import { type ReactNode } from "react";
import { Link } from "@digdir/designsystemet-react";

import styles from "./nav-link-list.module.scss";

export type NavLinkListItem = {
  id: string;
  href: string;
  label: string;
  suffix?: ReactNode;
  action?: ReactNode;
  onClick?: () => void;
  children?: readonly NavLinkListItem[];
};

export type NavLinkListProps = {
  items: readonly NavLinkListItem[];
};

const LinkItems = ({ items }: { items: readonly NavLinkListItem[] }) => (
  <ul className={styles.list}>
    {items.map((item) => (
      <li key={item.id}>
        <div className={item.action ? `${styles.row} ${styles.hasAction}` : styles.row}>
          <Link
            href={item.href}
            onClick={item.onClick}
          >
            <span className={styles.label}>{item.label}</span>
            {item.suffix}
          </Link>
          {item.action}
        </div>
        {item.children && item.children.length > 0 ? <LinkItems items={item.children} /> : null}
      </li>
    ))}
  </ul>
);

const NavLinkList = ({ items }: NavLinkListProps) => {
  if (items.length === 0) return null;

  return (
    <div>
      <LinkItems items={items} />
    </div>
  );
};

export default NavLinkList;
