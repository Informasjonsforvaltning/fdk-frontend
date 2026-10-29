"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type RefObject,
} from "react";
import cn from "classnames";
import { Button, type ButtonProps } from "@digdir/designsystemet-react";
import { MenuHamburgerIcon } from "@navikt/aksel-icons";

import styles from "./drawer.module.scss";

export type DrawerSide = "left" | "right" | "top" | "bottom";

type DrawerContextValue = {
  open: boolean;
  toggle: () => void;
  panelId: string;
  side: DrawerSide;
  toggleRef: RefObject<HTMLButtonElement | null>;
  panelRef: RefObject<HTMLDivElement | null>;
};

const DrawerContext = createContext<DrawerContextValue | null>(null);

const useDrawer = (): DrawerContextValue => {
  const value = useContext(DrawerContext);
  if (!value) {
    throw new Error("Drawer.ToggleButton and Drawer.Panel must be rendered inside Drawer");
  }
  return value;
};

export type DrawerProps = {
  side?: DrawerSide;
  /** When this value changes, the drawer closes. */
  closeOnChange?: string;
  className?: string;
  children: React.ReactNode;
};

const DrawerRoot = ({ side = "left", closeOnChange, className, children }: DrawerProps) => {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const closeOnChangeRef = useRef(closeOnChange);

  const toggle = useCallback(() => {
    setOpen((current) => !current);
  }, []);

  useEffect(() => {
    if (closeOnChangeRef.current === closeOnChange) return;
    closeOnChangeRef.current = closeOnChange;
    setOpen(false);
  }, [closeOnChange]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (!rootRef.current?.contains(target)) setOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      panelRef.current?.focus();
    } else if (wasOpen.current) {
      toggleRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  return (
    <DrawerContext.Provider value={{ open, toggle, panelId, side, toggleRef, panelRef }}>
      <div
        ref={rootRef}
        className={cn(styles.root, className)}
        data-side={side}
      >
        {children}
      </div>
    </DrawerContext.Provider>
  );
};

const ToggleButton = ({ children, onClick, variant = "tertiary", ...props }: ButtonProps) => {
  const { open, toggle, panelId, toggleRef } = useDrawer();

  return (
    <Button
      variant={variant}
      data-size="sm"
      {...props}
      ref={toggleRef}
      type="button"
      aria-expanded={open}
      aria-controls={panelId}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) toggle();
      }}
    >
      {children ?? <MenuHamburgerIcon aria-hidden />}
    </Button>
  );
};

const Panel = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const { open, panelId, side, panelRef } = useDrawer();
  if (!open) return null;

  return (
    <div
      {...props}
      ref={panelRef}
      id={panelId}
      className={cn(styles.panel, className)}
      data-side={side}
      tabIndex={-1}
    />
  );
};

const Drawer = Object.assign(DrawerRoot, {
  ToggleButton,
  Panel,
});

export { ToggleButton as DrawerToggleButton, Panel as DrawerPanel };

export default Drawer;
