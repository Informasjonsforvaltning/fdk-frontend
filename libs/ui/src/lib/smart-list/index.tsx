import React from 'react';

interface SmartListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  listType?: 'ul' | 'ol';
}

const SmartList = <T,>({ items, renderItem, listType = 'ul', ...rest }: SmartListProps<T> & React.HTMLAttributes<HTMLUListElement | HTMLOListElement>) => {
  
  if (items.length === 0) return null;
  if (items.length === 1) return <>{renderItem(items[0], 0)}</>;
  
  const ListTag = listType;
  
  return (
    <ListTag {...rest}>
      {items.map((item, index) => (
        <li key={`item-${index}`}>
          {renderItem(item, index)}
        </li>
      ))}
    </ListTag>
  );
};

export default SmartList;
