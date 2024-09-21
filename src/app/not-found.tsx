"use client"
import { useCallback, useEffect, useState } from "react";
import { getPageBySlug } from "./utils/get-page-by-slug";
import { sectionRenderer } from "./utils/section-renderer";

export default function NotFound() {

    const [pageData, setPageData] = useState<any>([]);

    const fetchData = useCallback(async () => {
        try {
            const page = await getPageBySlug("404")
            const contentSections = page.data[0].attributes.content;
            setPageData(contentSections);
        } catch (error: any) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="py-12 min-h-[calc(50vh)] bg-white flex align-middle items-center">
             {pageData && pageData.map((section: any, index: number) =>
                sectionRenderer(section, index)
            )}
        </div>
    );
}
