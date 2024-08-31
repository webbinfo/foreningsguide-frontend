"use client"

import CourseHero from "../CourseHero";
import { Picture } from "../../utils/interfaces";
import { sectionRenderer } from "../../utils/section-renderer";
import TOC from "../elements/TOC";
import { fetchAPI } from "../../utils/fetch-api";
import Cookies from 'js-cookie';
import Button from "../Button";
import { useRouter } from 'next/navigation';

interface CourseProps {
    id: number;
    attributes: {
        name: string;
        slug: string;
        introduction: string;
        updatedAt: string;
        content: Array<any>;
        subtitle: string;
        coverImage: Picture;
        sidenote: Array<any>;
    };
}

function handleCompleteCourse(slug: string) {
    Cookies.set(slug, 'true', { expires: 365 });
}

async function getDictionary() {
    const dictionaryItems = await fetchAPI("/dictionaries");

    const formattedDict: string[] = dictionaryItems.data.map((item: any) => {
        const mainItem = item.attributes.word.trim().toUpperCase();
        if (item.attributes.aliases == undefined) {
            return mainItem;
        } else {
            const aliases = item.attributes.aliases.toLowerCase().split(',').map((alias: string) => alias.trim());
            const itemList = [mainItem, ...aliases];
            return itemList.join(', ');

        }

    });

    return formattedDict;
}

export default async function Course({ data }: { data: CourseProps }) {
    const router = useRouter();
    const updatedAtDateTime = new Date(data.attributes.updatedAt);
    const formattedDate = updatedAtDateTime.toISOString().split('T')[0];

    const contentSections = data.attributes.content;

    //const dictionaryItems = await getDictionary();

    const handleButtonClick = () => {
        const slug = data.attributes.slug;
        handleCompleteCourse(slug);
        router.push('/kurser'); // Redirect to the parent page
    };

    return (
        <div className="bg-white py-8">
            <CourseHero key={0} data={{
                id: "0",
                heading: data.attributes.name,
                subheading: formattedDate,
                image: data.attributes.coverImage,
            }} />

            {/* TODO: Implement more robust solution for TOC placement */}
            <div className="flex flex-col xl:flex-row">
                <div>
                    <div className="pt-12 pl-12 xl:hidden">
                        {/* Display TOC at the top for smaller screens */}
                        <TOC data={contentSections} />
                    </div>
                    <div className="lg:pt-4 w-11/12 mx-4">
                        {contentSections && contentSections.map((section: any, index: number) => (
                            sectionRenderer(section, index)//, dictionaryItems)
                        ))}
                    </div>
                    <div className="w-full flex justify-center">
                        <div onClick={handleButtonClick} className="cursor-pointer">
                            <Button id={data.id} text="Avsluta kurs" link="/kurser" type="Solid" newTab={false} />
                        </div>
                    </div>
                </div>
                {/* Sticky TOC for screens larger than xl */}
                <div className="hidden xl:pt-4 xl:block xl:sticky xl:top-24 xl:right-12 2xl:right-0 xl:w-full 2xl:w-4/5 xl:h-full">
                    <TOC data={contentSections} />
                </div>
            </div>


        </div>
    )
}