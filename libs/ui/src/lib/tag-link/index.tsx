import { Link, LinkProps } from "@digdir/designsystemet-react";
import styles from "./styles.module.scss";

// Link component from Designsystemet, styled as a link variant of the Tag component (also from Designsystemet)
const TagLink = ({ children, ...props }: LinkProps) => {
  return (
    <Link
      className={styles.link + " ds-tag"}
      {...props}
    >
      {children}
    </Link>
  );
};

export default TagLink;
