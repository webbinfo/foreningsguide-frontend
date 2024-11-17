import { getPageBySlug } from "./utils/get-page-by-slug";
import { sectionRenderer } from "./utils/section-renderer";


export default async function RootRoute() {
  try {
    const page = await getPageBySlug('hem');
    if (page.error && page.error.status == 401)
      throw new Error("Unauthorized");
    
    if (!page || !page.data || page.data.length === 0) return null;

    const contentSections = page.data[0].attributes.content;
    return contentSections.map((section: any, index: number) => 
      sectionRenderer(section, index)
  );
  } catch (error: any) {
    return null;
  }
  
}