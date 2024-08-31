import { getStrapiMedia } from "../utils/api-helpers"
import { HeroProps } from "../utils/interfaces";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function CourseHero({ data }: HeroProps) {
    const imgUrl = getStrapiMedia(data.image.data.attributes.formats.medium.url);

    return (
        <div className="relative h-64 lg:h-72 bg-cover bg-center" style={{ backgroundImage: `url(${imgUrl})` }}>
            {/* Overlay */}

            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-gray-800/60 to-gray-600/60"></div>


            {/* Text Content */}
            <div className="absolute top-0 right-0 z-20 opacity-70 w-1/2 sm:w-1/4 h-24"></div>
            <div className="relative z-10 flex items-center justify-center h-full mx-auto xl:mx-8 px-4 sm:px-6 lg:px-8">
                <Link href="/kurser" className="text-white absolute top-4 left-4 xl:left-0 z-30 no-underline">
                    <span className="inline-flex flex-row justify-start items-center">
                        <ArrowLeftIcon className="h-4 w-4" /> Tillbaka till kursvyn
                    </span>
                </Link>
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white w-full">
                        {data.heading}
                    </h1>
                </div>
                <i className="absolute bottom-4 left-4 xl:left-0 text-sm text-white">Senast uppdaterad: {data.subheading}</i>
            </div>
        </div>
    )
}