import { getStrapiMedia } from "../utils/api-helpers";
import Image from "next/image";
import { MediaProps } from "../utils/interfaces";

export default function Media({ data }: { data: MediaProps }) {
    const mediaUrl = getStrapiMedia(data.data.attributes.url);

    return (
        <div className="flex items-center justify-center mt-8 lg:mt-0 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
            <Image 
                src={mediaUrl || ""} 
                alt={data.data.attributes.alternativeText || "Missing alt text"}
                className="object-cover w-full h-full rounded-lg overflow-hidden"
                width={700} 
                height={700} 
            />
        </div>
    )
}