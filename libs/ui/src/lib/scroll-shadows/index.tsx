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
    overflowTop: false,
    overflowBottom: false,
  });

  const updateOverflow = () => {
    const container = scrollerRef.current;
    if (!container) return;

    const { scrollLeft, scrollTop, scrollWidth, scrollHeight, clientWidth, clientHeight } = container;

    setOverflow({
      overflowLeft: scrollLeft > 0,
      overflowRight: scrollLeft + clientWidth < scrollWidth,
      overflowTop: scrollTop > 0,
      overflowBottom: scrollTop + clientHeight < scrollHeight,
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

  const showHorizontal = orientation === "all" || orientation === "horizontal";
  const showVertical = orientation === "all" || orientation === "vertical";

  return (
    <div
      className={cn(styles.container, className, {
        [styles.shadowTop]: showVertical && overflow.overflowTop,
        [styles.shadowRight]: showHorizontal && overflow.overflowRight,
        [styles.shadowBottom]: showVertical && overflow.overflowBottom,
        [styles.shadowLeft]: showHorizontal && overflow.overflowLeft,
      })}
      data-overflows={
        (showHorizontal && (overflow.overflowLeft || overflow.overflowRight)) ||
        (showVertical && (overflow.overflowTop || overflow.overflowBottom))
      }
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
