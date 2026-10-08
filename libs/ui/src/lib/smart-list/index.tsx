import React from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

interface SmartListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  listType?: "ul" | "ol";
  listItemWrapper?: React.ComponentType<React.PropsWithChildren>;
}

const SmartList = <T,>({
  items,
  renderItem,
  listType = "ul",
  listItemWrapper: ListItemWrapper,
  className,
  ...rest
}: SmartListProps<T> & React.HTMLAttributes<HTMLUListElement | HTMLOListElement>) => {
  if (items.length === 0) return null;
  if (items.length === 1) return <>{renderItem(items[0], 0)}</>;

  const ListTag = listType;

  return (
    <ListTag
      className={cn({ [styles.list]: ListItemWrapper }, className) || undefined}
      {...rest}
    >
      {items.map((item, index) => {
        const content = renderItem(item, index);

        return (
          <li key={`item-${index}`}>{ListItemWrapper ? <ListItemWrapper>{content}</ListItemWrapper> : content}</li>
        );
      })}
    </ListTag>
  );
};

export default SmartList;
