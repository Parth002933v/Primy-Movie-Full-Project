export function convertToSlugUrl({ str }: { str: string }): string {
    // Remove special characters and keep alphanumeric, spaces, and hyphens
    let slug = str.replace(/[^\w\s-]/g, '');
  
    // Replace sequences of spaces with a single hyphen
    slug = slug.replace(/\s+/g, '-');
  
    // Replace sequences of multiple hyphens with a single hyphen
    slug = slug.replace(/-+/g, '-');
  
    // Remove leading and trailing hyphens
    slug = slug.replace(/^-+|-+$/g, '');
  
    // Ensure the output is not empty
    if (slug === '') {
      slug = 'default-slug'; // Default value in case the input string was entirely invalid
    }
  
    return slug;
  }