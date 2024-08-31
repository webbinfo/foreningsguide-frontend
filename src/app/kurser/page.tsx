"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchAPI } from "../utils/fetch-api";
import Loader from "../components/Loader";
import CourseCard from "../components/CourseCard";
import { getPageBySlug } from "../utils/get-page-by-slug";
import { sectionRenderer } from "../utils/section-renderer";
import Cookies from "js-cookie";

interface Meta {
    pagination: {
        start: number;
        limit: number;
        total: number;
    }
}

function getCompletedBySlug(slug: string) {
    const status = Cookies.get(slug);

    if (status == "true") {
        return true
    } else {
        return false
    }
}

function clearCookies() {
    const allCookies = Cookies.get()
    for (let cookie in allCookies) {
        Cookies.remove(cookie); // Remove each cookie
    }
    window.location.reload()
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

    console.log(data)
    return (
        <div className="flex flex-col bg-white justify-center items-center text-left pb-8 md:text-center">
            {pageData.map((section: any, index: number) => 
                sectionRenderer(section, index)
            )}
            <div onClick={clearCookies}>
                <br/>
                <p><b>TA BORT SEN:</b>Rensa alla kakor</p>
            </div>
            <div className="grid grid-cols-1 auto-rows-auto gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 w-3/4 pt-12 text-sm">
                {data.map((course: any) => (
                    <CourseCard 
                        key={course.id}
                        id={course.id} 
                        name={course.attributes.order + " " + course.attributes.name} 
                        slug={course.attributes.slug} 
                        introduction={course.attributes.introduction} 
                        coverImage={course.attributes.coverImage}
                        completed={getCompletedBySlug(course.attributes.slug)}
                    />
                ))}
            </div>
        </div>
    )
}