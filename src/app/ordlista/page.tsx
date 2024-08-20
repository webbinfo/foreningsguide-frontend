"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchAPI } from "../utils/fetch-api";
import Loader from "../components/Loader";
import { getPageBySlug } from "../utils/get-page-by-slug";
import { sectionRenderer } from "../utils/section-renderer";
import DictionaryItems from "../components/DictionaryItem";
import Button from "../components/Button";

// Implemented pagination, even though it is not needed atm
export default function RootLayout() {
    const [contentData, setContentData] = useState<any>([]);
    const [pageData, setPageData] = useState<any>([]);
    const [isLoading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
            const path = "/dictionaries";
            const urlParamsObject = {
                sort: { word: 'asc' },
            };

            const options = { headers: { Authorization: `Bearer ${token}` } };
            const response = await fetchAPI(path, urlParamsObject, options);
            setContentData(response.data);

            const page = await getPageBySlug("ordlista")
            const contentSections = page.data[0].attributes.content;
            setPageData(contentSections);
        } catch (error: any) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (isLoading) return <Loader />;

    return (
        <div className="flex flex-col bg-white justify-center items-center text-left md:text-center">
            {pageData && pageData.map((section: any, index: number) =>
                sectionRenderer(section, index)
            )}
            <div className="flex flex-col w-full px-8 pt-8 md:w-5/6 md:grid md:grid-cols-2 md:gap-x-4 xl:grid-cols-3">
                {contentData.map((item: any, index: number) => (
                    <div key={item.id} className="mb-0">
                        <DictionaryItems word={item.attributes.word} definition={item.attributes.definition} aliases={item.attributes.aliases} index={index} />
                    </div>
                ))}
            </div>
            {/*<div className="pb-8">
                {meta!.pagination.total >= meta!.pagination.start + meta!.pagination.limit &&
                    <div onClick={loadMoreCourses}>
                        <Button id={1337} text={"Läs in fler ord"} newTab={false} link="#" type={"Solid"} />
                    </div>
                }
            </div>*/}
        </div>
    )
}