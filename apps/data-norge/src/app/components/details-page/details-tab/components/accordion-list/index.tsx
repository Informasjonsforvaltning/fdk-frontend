import { Card, Details } from "@digdir/designsystemet-react";
import { Dlist, PlaceholderText, PlaceholderBox } from "@fdk-frontend/ui";
import styles from "./accordion-list.module.scss";
import { Fragment } from "react";

export type SingleEntry = {
    title: string;
    contentsMap: Map<string, string>;
};
type AccordionListProps = {
    noDataText?: string;
    entries: SingleEntry[];
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
                                    {entry.contentsMap.size > 0 ? (
                                        Array.from(entry.contentsMap.entries()).map(([heading, content]) => (
                                            <Fragment key={heading}>
                                                <dt>{heading}:</dt>
                                                <dd>
                                                    {content.length ? (
                                                        content
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
