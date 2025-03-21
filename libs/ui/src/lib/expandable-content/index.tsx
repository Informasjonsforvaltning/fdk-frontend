import { PropsWithChildren, useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import { Button } from '@digdir/designsystemet-react';
import { PlusIcon, MinusIcon } from '@navikt/aksel-icons';
import styles from './expandable-content.module.scss';

const ExpandableContent = ({ children, maxHeight, ...props }: { maxHeight?: number } & PropsWithChildren) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [overflow, setOverflow] = useState<boolean | undefined>(undefined);
    const [collapsed, setCollapsed] = useState<boolean | undefined>(undefined);

    let observer: any;

    useEffect(() => {
        const container = containerRef.current;
        if (container && maxHeight) {
            observer = new ResizeObserver(() => {
                if (overflow === undefined && container.offsetHeight > maxHeight) {
                    setOverflow((prev) => {
                        if (prev === undefined && container.offsetHeight > maxHeight) {
                            return true;
                        }
                        return prev;
                    });
                    setCollapsed((prev) => {
                        if (prev === undefined && container.offsetHeight > maxHeight) {
                            return true;
                        }
                        return prev;
                    });
                }
            });

            observer.observe(container);

            return () => observer.disconnect();
        }
    }, []);

    return (
        <div
            className={cn(styles.container, {
                [styles.overflow]: overflow,
                [styles.collapsed]: collapsed,
            })}
            ref={containerRef}
            data-overflow={overflow}
            {...props}
        >
            <div
                className={styles.content}
                style={collapsed ? { maxHeight } : undefined}
            >
                {children}
            </div>
            {overflow && (
                <Button
                    className={styles.button}
                    variant='tertiary'
                    size='sm'
                    onClick={() => setCollapsed(!collapsed)}
                    aria-expanded={!collapsed}
                >
                    {collapsed ? (
                        <>
                            <PlusIcon />
                            Vis hele
                        </>
                    ) : (
                        <>
                            <MinusIcon />
                            Skjul
                        </>
                    )}
                </Button>
            )}
        </div>
    );
};

export default ExpandableContent;
