export const parseCommaSeparatedParam = function (
  value: string | null,
  transform: (part: string) => string = (part) => part,
): string[] {
  if (!value) return [];
  return Array.from(
    new Set(
      value
        .split(",")
        .map((part) => part.trim())
        .filter((part) => part.length > 0)
        .map(transform),
    ),
  );
};
