import { Card, Details } from "@digdir/designsystemet-react";
import { Dlist, PlaceholderText, PlaceholderBox } from "@fdk-frontend/ui";
import styles from "./accordion-list.module.scss";
import { Fragment } from "react";

export type SingleRow = {
    label: string;
    value?: string;
};

export type SingleDetailsEntry = {
    title: string;
    content: SingleRow[];
};
type AccordionListProps = {
    noDataText?: string;
    entries: SingleDetailsEntry[];
};

export const AccordionList = ({ noDataText = "-", entries }: AccordionListProps) => {
    return (
        <>
            {entries.length > 0 ? (
                <Card className={styles.dlist}>
                    {entries.map((entry) => (
                        <Details key={entry.title}>
                            <Details.Summary>{entry.title}</Details.Summary>

                            <Details.Content className={styles.noMargin}>
                                <Dlist>
                                    {entry.content.length > 0 ? (
                                        entry.content.map((contentEntry) => (
                                            <Fragment key={contentEntry.label}>
                                                <dt>{contentEntry.label}:</dt>
                                                <dd>
                                                    {contentEntry.value ? (
                                                        contentEntry.value
                                                    ) : (
                                                        <PlaceholderText>{noDataText}</PlaceholderText>
                                                    )}
                                                </dd>
                                            </Fragment>
                                        ))
                                    ) : (
                                        <PlaceholderText>{noDataText}</PlaceholderText>
                                    )}
                                </Dlist>
                            </Details.Content>
                        </Details>
                    ))}
                </Card>
            ) : (
                <PlaceholderBox>{noDataText}</PlaceholderBox>
            )}
        </>
    );
};
