import { fetchAPI } from "@/app/utils/fetch-api";
import { Metadata } from "next";
import Course from "@/app/components/pages/Course";

async function getCourseBySlug(slug: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = "/courses";
    const urlPraramsObject = {
        filters: { slug },
        populate: {
            coverImage: { populate: '*' },
            content: { populate: '*' },
        }
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const response = await fetchAPI(path, urlPraramsObject, options);
    return response;
}

async function getMetaData(slug: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = "/courses";
    const urlParamsObject = {
        filters: { slug },
        populate: {seo: {populate: '*'}}
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const response = await fetchAPI(path, urlParamsObject, options);
    return response.data;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const meta = await getMetaData(params.slug);
    const metadata = meta[0].attributes.seo;

    return {
        title: metadata.metaTitle,
        description: metadata.metaDescription,
    }
}

export default async function CourseRoute({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const data = await getCourseBySlug(slug);

    if (data.data.length === 0) return <h2>Inga kurser hittades</h2>;
    return <Course data={data.data[0]} />;
}