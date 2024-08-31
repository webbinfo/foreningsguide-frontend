"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchAPI } from "../utils/fetch-api";
import Loader from "../components/Loader";
import CourseCard from "../components/CourseCard";
import { getPageBySlug } from "../utils/get-page-by-slug";
import { sectionRenderer } from "../utils/section-renderer";

interface Meta {
    pagination: {
        start: number;
        limit: number;
        total: number;
    }
}

// Implemented pagination, even though it is not needed atm
export default function RootLayout() {
    const [data, setData] = useState<any>([]);
    const [pageData, setPageData] = useState<any>([]);
    const [isLoading, setLoading] = useState(true);
    const [meta, setMeta] = useState<Meta | undefined>();

    const fetchData = useCallback(async (start: number, limit: number) => {
        setLoading(true);
        try {
            const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
            const path = "/courses";
            const urlParamsObject = {
                sort: { order: 'asc' },
                populate: {
                    coverImage: { populate: '*' },
                    content: { populate: '*' }
                },
                pagination: {
                    start,
                    limit
                },
            };

            const options = { headers: { Authorization: `Bearer ${token}` } };
            const response = await fetchAPI(path, urlParamsObject, options);

            if (start == 0) {
                setData(response.data);
            } else {
                setData((prevData: any[]) => [...prevData, ...response.data]);
            }

            setMeta(response.meta);
            const page = await getPageBySlug("kurser")
            const contentSections = page.data[0].attributes.content;
            setPageData(contentSections);
        } catch (error: any) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Added, but not implemented yet as it is not needed
    function loadMoreCourses(): void {
        const nextCourses = meta!.pagination.start + meta!.pagination.limit;
        fetchData(nextCourses, Number(process.env.NEXT_PUBLIC_COURSES_PER_PAGE));
    }

    useEffect(() => {
        fetchData(0, Number(process.env.NEXT_PUBLIC_COURSES_PER_PAGE));
    }, [fetchData]);

    if (isLoading) return <Loader />;

    return (
        <div className="flex flex-col bg-white justify-center items-center text-left pb-8 md:text-center">
            {pageData.map((section: any, index: number) =>
                sectionRenderer(section, index)
            )}
            <div className="masonry-grid w-3/4 pt-12 text-sm">
                {data.map((course: any) => (
                    <div key={course.id} className="masonry-item">
                        <CourseCard
                            id={course.id}
                            name={course.attributes.order + " " + course.attributes.name}
                            slug={course.attributes.slug}
                            introduction={course.attributes.introduction}
                            coverImage={course.attributes.coverImage}
                            completed={course.id == 4 ? true : false}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}