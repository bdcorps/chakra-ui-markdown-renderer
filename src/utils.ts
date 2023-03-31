export const encodeSlug = (slug: string): string => {
  if (!slug) return "";
  return slug
    .toLowerCase()
    .trim()
    .replace(/[^a-zA-Z0-9-\s\/]+/g, "")
    .replace(/ /g, "-")
    .replace(/(\/)$/, ""); //should not end with a /
};
