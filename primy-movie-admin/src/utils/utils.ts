export function stringToSlug(str: string) {
  // Convert to lowercase
  str = str.toLowerCase();

  // Remove special characters
  str = str.replace(/[^a-z0-9\s-]/g, "");

  // Replace spaces with hyphens
  str = str.replace(/\s+/g, "-");

  // Remove leading and trailing hyphens
  str = str.replace(/^-+|-+$/g, "");

  return str;
}
