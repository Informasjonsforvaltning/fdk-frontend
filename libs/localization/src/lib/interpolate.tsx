import React from 'react';

/**
 * Interpolates values into a string containing placeholders {{key}}.
 * Replaces each {{key}} with the corresponding value from params as a React node.
 *
 * @param str - The string containing placeholders (e.g. "Hello {{name}}")
 * @param params - Key-value pairs for interpolation (e.g. { name: <strong>World</strong> })
 * @returns React element with interpolated content
 */
export function interpolate(
  str: string,
  params: Record<string, React.ReactNode>
): React.ReactElement {
  const regex = /{{\s*([^{}\s]+)\s*}}/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(str)) !== null) {
    const key = match[1];
    parts.push(str.slice(lastIndex, match.index));
    parts.push(<React.Fragment key={key}>{params[key]}</React.Fragment>);
    lastIndex = regex.lastIndex;
  }

  parts.push(str.slice(lastIndex));
  return <>{parts}</>;
}
