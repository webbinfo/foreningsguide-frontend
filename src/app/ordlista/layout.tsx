import { Metadata } from "next";
import { FALLBACK_SEO } from "../utils/constants";
import { getPageBySlug } from "../utils/get-page-by-slug";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageBySlug('ordlista');
  
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


export default function layout({children} : {children: React.ReactNode}) {
    return (
        <div>
            {children}
        </div>
    )
}