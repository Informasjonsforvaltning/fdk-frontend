import cn from "classnames";
import ExternalLink from "../external-link";
import styles from "./transportportal-partners-linklist.module.scss";

export type TransportportalPartnersLinklistProps = {
  className?: string;
};

const TransportportalPartnersLinklist = ({ className }: TransportportalPartnersLinklistProps) => (
  <div className={cn(styles.logos, className)}>
    <ExternalLink
      aria-label="Statens vegvesen"
      href="https://www.vegvesen.no/"
      className={cn(styles.logo, styles.statensVegvesen)}
    />
    <ExternalLink
      aria-label="Jernbanedirektoratet"
      href="https://www.jernbanedirektoratet.no/"
      className={cn(styles.logo, styles.jernbanedirektoratet)}
    />
    <ExternalLink
      aria-label="Entur"
      href="https://entur.no/"
      className={cn(styles.logo, styles.entur)}
    />
    <ExternalLink
      aria-label="Digdir"
      href="https://www.digdir.no/"
      className={cn(styles.logo, styles.digdir)}
    />
  </div>
);

export default TransportportalPartnersLinklist;
