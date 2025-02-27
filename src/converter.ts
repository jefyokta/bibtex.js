export const objectToBib = (cite: Cite[]): string => {
    return cite
      .map((c) => {
        const { id, type, data } = c;
        const fields = Object.entries(data)
          .map(([key, value]) => `  ${key} = {${value}}`)
          .join(",\n");
  
        return `@${type}{${id},\n${fields}\n}`;
      })
      .join("\n\n");
  };
  
  export const bibToObject = (bibContent: string): Cite[] => {
    const entryRegex = /@(\w+)\{([^,]+),([\s\S]*?)}(?=\s*@|\s*$)/g;
    const matches = [...bibContent.matchAll(entryRegex)];
  
    if (matches.length === 0) {
      console.error("No matches found");
      return [];
    }
    return matches.map((match) => {
      const [, type, id, fields] = match;
  
      const fieldRegex = /(\w+)\s*=\s*\{((?:[^{}]|\{[^{}]*\})*)\}/g;
      const fieldMatches = [...fields.matchAll(fieldRegex)];
  
      const fieldData = Object.fromEntries(
        fieldMatches.map(([_, key, value]) => [key.trim(), value.trim()]),
      );
  
      return { id: id, type: type, data: fieldData || {} };
    });
  };
  