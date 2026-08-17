import React from "react";
import { Heading } from "@digdir/designsystemet-react";
import { PlaceholderBox, Dlist } from "@fdk-frontend/ui";
import { DatasetDetailsProps } from "../../";
import { printLocaleValue } from "@fdk-frontend/utils";
import InternalLink from "@fdk-frontend/libs/ui/src/lib/internal-link";

const ConceptDetails = ({ dataset, locale, dictionary, concepts, profile }: DatasetDetailsProps) => {
  return (
    <section>
      <Heading
        level={2}
        data-size="xs"
      >
        {dictionary.details.concepts.title}
      </Heading>
      {concepts && concepts.length ? (
        <Dlist>
          {concepts.map((concept) => {
            return (
              <React.Fragment key={concept.uri}>
                <dt>
                  <InternalLink
                    entity={concept}
                    href={`/concepts/${concept.id}`}
                    profile={profile}
                  >
                    {printLocaleValue(locale, concept.title) || concept.uri}
                  </InternalLink>
                </dt>
                <dd>{printLocaleValue(locale, concept.description)}</dd>
              </React.Fragment>
            );
          })}
        </Dlist>
      ) : (
        <PlaceholderBox>{dictionary.details.noData}</PlaceholderBox>
      )}
    </section>
  );
};

export default ConceptDetails;
