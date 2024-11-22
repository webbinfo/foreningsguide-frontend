import { getPageBySlug } from "./utils/get-page-by-slug";
import { sectionRenderer } from "./utils/section-renderer";
import { Metadata } from "next";
import { FALLBACK_SEO } from "./utils/constants";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageBySlug('hem');
  
  var concatTitle;
  var meta;
  if (!data || data.error && data.error.status == 401) {
    concatTitle = FALLBACK_SEO.title;
    meta = FALLBACK_SEO;
  } else {
    meta = data.data[0].attributes.seo;
    concatTitle = `Föreningsguiden - ${meta.metaTitle}`;
  }

  return {
      title: concatTitle,
      description: meta.metaDescription,
  }
}

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