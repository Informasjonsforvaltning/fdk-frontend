"use client";

import React, { useState, useRef, useEffect } from "react";
import cn from "classnames";

import styles from "./scroll-shadows.module.scss";

export type ScrollShadowsOrientation = "all" | "horizontal" | "vertical";

type ScrollShadowsProps = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: ScrollShadowsOrientation;
};

const ScrollShadows = ({ children, className, orientation = "horizontal", ...props }: ScrollShadowsProps) => {
  const scrollerRef = useRef(null);
  const [overflow, setOverflow] = useState({
    overflowLeft: false,
    overflowRight: false,
  });

  const updateOverflow = () => {
    const container = scrollerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setOverflow({
      overflowLeft: scrollLeft > 0,
      overflowRight: scrollLeft + clientWidth < scrollWidth,
    });
  };

  useEffect(() => {
    const container = scrollerRef.current;
    if (!container) return;

    updateOverflow(); // Initial check
    (container as HTMLElement).addEventListener("scroll", updateOverflow);

    const resizeObserver = new ResizeObserver(updateOverflow);
    resizeObserver.observe(container);

    return () => {
      (container as HTMLElement).removeEventListener("scroll", updateOverflow);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      className={cn(styles.container, className, {
        [styles.shadowRight]: overflow.overflowRight,
        [styles.shadowLeft]: overflow.overflowLeft,
      })}
      data-overflows={overflow.overflowLeft || overflow.overflowRight}
      {...props}
    >
      <div
        ref={scrollerRef}
        className={cn(styles.scroller, styles[orientation])}
      >
        {children}
      </div>
    </div>
  );
};

export default ScrollShadows;
