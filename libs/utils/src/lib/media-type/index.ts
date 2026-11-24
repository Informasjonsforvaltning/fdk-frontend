import mime from "mime-types";

type MediaTypeLike = {
  code?: string;
  name?: string;
};

export const getMediaTypeLabel = ({ code, name }: MediaTypeLike): string | undefined => {
  const extension = code ? mime.extension(code) : false;
  const label = name || extension || code;
  return label?.toLowerCase();
};
