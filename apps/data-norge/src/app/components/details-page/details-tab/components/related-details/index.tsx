import React from "react";
import { Heading } from "@digdir/designsystemet-react";
import { ScrollShadows, PlaceholderBox, DatasetTable } from "@fdk-frontend/ui";
import { DatasetDetailsProps } from "../../";

const RelatedDetails = ({
  related,
  locale,
  dictionary,
  profile,
  baseUri,
}: Omit<DatasetDetailsProps, "dataset">) => {
  return (
    <section>
      <Heading
        level={2}
        data-size="xs"
      >
        {dictionary.details.related.title}
      </Heading>
      {related && related.length ? (
        <ScrollShadows>
          <DatasetTable
            datasets={related}
            locale={locale}
            dictionary={dictionary}
            profile={profile}
            baseUri={baseUri}
          />
        </ScrollShadows>
      ) : (
        <PlaceholderBox>Ikke oppgitt</PlaceholderBox>
      )}
    </section>
  );
};

export default RelatedDetails;
