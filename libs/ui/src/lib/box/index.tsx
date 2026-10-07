import React from "react";
import cn from "classnames";

import "./box.module.scss";

const Box = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('fdk-box', className)}>{children}</div>;
};

export default Box;
