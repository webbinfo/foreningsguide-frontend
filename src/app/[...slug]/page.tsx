import { getPageBySlug } from "../utils/get-page-by-slug";
import { Metadata } from "next";
import { FALLBACK_SEO } from "../utils/constants";
import { sectionRenderer } from "../utils/section-renderer";
import { ReactNode } from "react";
import { notFound } from "next/navigation";

type Pops = {
    params: {
        slug: string;
    }
}

export async function generateMetadata({params}: Pops): Promise<Metadata> {
    const page = await getPageBySlug(params.slug);


    if (page.data.length == 0 || !page.data[0].attributes?.seo) return FALLBACK_SEO;
    const metadata = page.data[0].attributes.seo;

    return {
        title: metadata.metaTitle,
        description: metadata.metaDescription,
    }
}


export default async function PageRoute({ params }: Pops): Promise<ReactNode> {
    const page = await getPageBySlug(params.slug);
    if(page.data.length === 0) return notFound(); // Return 404 page if page not found

    const contentSections = page.data[0].attributes.contentSections;

    return (
        <>
            {contentSections.map((section: any, index: number) =>
                sectionRenderer(section, index)
            )}
        </>
    );
}