import { getPageBySlug } from "../utils/get-page-by-slug";
import { Metadata } from "next";
import { FALLBACK_SEO } from "../utils/constants";
import { sectionRenderer } from "../utils/section-renderer";
import { ReactNode } from "react";

type Pops = {
    params: {
        slug: string;
    }
}

export async function generateMetadata({params}: Pops): Promise<Metadata> {
    const page = await getPageBySlug(params.slug);

    if (!page.data[0].attributes?.seo) return FALLBACK_SEO;
    const metadata = page.data[0].attributes.seo;

    return {
        title: metadata.metaTitle,
        description: metadata.metaDescription,
    }
}


export default async function PageRoute({ params }: Pops): Promise<ReactNode> {
    const page = await getPageBySlug(params.slug);
    if(page.data.length === 0) return null;

    const contentSections = page.data[0].attributes.contentSections;

    return (
        <>
            {contentSections.map((section: any, index: number) =>
                sectionRenderer(section, index)
            )}
        </>
    );
}