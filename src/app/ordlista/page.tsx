"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchAPI } from "../utils/fetch-api";
import Loader from "../components/Loader";
import { getPageBySlug } from "../utils/get-page-by-slug";
import { sectionRenderer } from "../utils/section-renderer";
import DictionaryItems from "../components/DictionaryItem";
import Button from "../components/Button";
import Head from "next/head";

interface Meta {
    pagination: {
        start: number;
        limit: number;
        total: number;
    }
}

const PAGE_SIZE = 24;

export default function RootLayout() {
    const [contentData, setContentData] = useState<any>([]);
    const [pageData, setPageData] = useState<any>([]);
    const [isLoading, setLoading] = useState(true);
    const [meta, setMeta] = useState<Meta | undefined>();
    const [SEOData, setSEOData] = useState<any>();

    const fetchData = useCallback(async (start: number, limit: number) => {
        setLoading(true);
        try {
            const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
            const path = "/dictionaries";
            const urlParamsObject = {
                sort: { word: 'asc' },
                pagination: {
                    start,
                    limit
                },
            };

            const options = { headers: { Authorization: `Bearer ${token}` } };
            const response = await fetchAPI(path, urlParamsObject, options);
            if (start == 0) {
                setContentData(response.data);
            } else {
                setContentData((prevData: any[]) => [...prevData, ...response.data]);
            }
            setMeta(response.meta);
            setContentData(response.data);

            const page = await getPageBySlug("ordlista")
            const contentSections = page.data[0].attributes.content;
            setPageData(contentSections);
            setSEOData(page.data[0].attributes.seo);
        } catch (error: any) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    function loadMoreCourses(): void {
        const nextCourses = meta!.pagination.start + meta!.pagination.limit;
        fetchData(0, nextCourses+Number(PAGE_SIZE));
    }

    useEffect(() => {
        fetchData(0, Number(PAGE_SIZE));
    }, [fetchData]);

    if (isLoading) return <Loader />;

    return (
        <>
            <Head>
                <title>{SEOData.metaTitle}</title>
                <meta name="description" content={SEOData.metaDescription}/>
            </Head>
            <div className="flex flex-col bg-white justify-center items-center text-left md:text-center">
                {pageData && pageData.map((section: any, index: number) =>
                    sectionRenderer(section, index)
                )}
                <div className="flex flex-col w-full px-4 pt-8 md:w-5/6 md:grid md:grid-cols-2 md:gap-x-4 xl:grid-cols-3">
                    {contentData.map((item: any, index: number) => (
                        <div key={item.id} className="mb-0">
                            <DictionaryItems word={item.attributes.word} definition={item.attributes.definition} aliases={item.attributes.aliases} index={index} />
                        </div>
                    ))}
                </div>
                <div className="pt-4 pb-8">
                    {meta!.pagination.total > meta!.pagination.start + meta!.pagination.limit &&
                        <div onClick={loadMoreCourses}>
                            <Button id={1337} text={"Läs in fler ord"} newTab={false} link="#" type={"Solid"} />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}