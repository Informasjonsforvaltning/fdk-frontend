export const sanitizeString = (str?: string): string | undefined => {
  if (!str) return undefined;
  // Remove any potentially dangerous characters
  return str.replace(/[<>]/g, "").trim();
};

export const sanitizeArray = (arr: any[] | undefined): any[] | undefined => {
  if (!arr || !Array.isArray(arr)) return undefined;
  return arr.map((item) => {
    if (typeof item === "string") {
      return sanitizeString(item);
    }
    if (typeof item === "object" && item !== null) {
      return Object.keys(item).reduce((acc, key) => {
        const value = item[key];
        if (typeof value === "string") {
          acc[key] = sanitizeString(value);
        } else if (Array.isArray(value)) {
          acc[key] = sanitizeArray(value);
        } else {
          acc[key] = value;
        }
        return acc;
      }, {} as any);
    }
    return item;
  });
};

// Safely stringify with error handling
export const safeStringify = (obj: any): string => {
  try {
    const json = JSON.stringify(obj, (key, value) => {
      // Remove any undefined values to prevent JSON injection
      if (value === undefined) return undefined;
      return value;
    });
    if (typeof json !== "string") return "{}";
    // Escape < > & so JSON-LD output can't break out of its <script> block.
    return json.replace(/</g, "\\u003C").replace(/>/g, "\\u003E").replace(/&/g, "\\u0026");
  } catch (error) {
    console.error("Error stringifying structured data:", error);
    return "{}";
  }
};
