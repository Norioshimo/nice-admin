export const buildParams = (params: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== undefined && v !== null)
  );