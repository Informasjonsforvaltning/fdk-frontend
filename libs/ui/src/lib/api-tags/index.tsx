import React from "react";
import { getMediaTypeLabel } from "@fdk-frontend/utils";
import { type DataService } from "@fellesdatakatalog/types";
import { Tag } from "@digdir/designsystemet-react";
import TagList, { type TagListProps } from "../tag-list";

type ApiTagsProps = TagListProps & {
  api: DataService;
};

const ApiTags = ({ children, api, ...props }: ApiTagsProps & React.HTMLAttributes<HTMLUListElement>) => {
  return (
    <TagList {...props}>
      {api.fdkFormat
        ?.filter((format) => format?.code)
        .map((format) => (
          <Tag
            data-size="sm"
            key={format.code}
          >
            {getMediaTypeLabel(format)}
          </Tag>
        ))}
    </TagList>
  );
};

export default ApiTags;
