import React from "react";
import styles from "./styles.module.scss";

type DatasetPreviewPlainTextProps = {
  content: string;
};

const DatasetPreviewPlainText = ({
  content,
  ...props
}: DatasetPreviewPlainTextProps & React.HTMLAttributes<HTMLPreElement>) => {
  return (
    <pre
      className={styles.plainText}
      {...props}
    >
      {content}
    </pre>
  );
};

export default DatasetPreviewPlainText;
