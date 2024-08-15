import { getStrapiMedia } from "../../utils/api-helpers"
import Image from "next/image";
import { HeroProps } from "../../utils/interfaces";

export default function Hero({ data }: HeroProps) {
    const imgUrl = getStrapiMedia(data.image.data.attributes.url);

    return (
        <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${imgUrl})` }}>
            {/* Overlay */}

            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-gray-800/60 to-gray-600/60"></div>


            {/* Text Content */}
            <div className="absolute top-0 right-0 z-20 opacity-70 w-1/2 sm:w-1/4 h-24">
                <Image src="/hero-illustration-studentlivet-min.svg" alt="Hero Illustration" width={400} height={400} />
            </div>
            <div className="relative z-10 flex items-center justify-start h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center sm:text-left">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white w-full sm:w-1/2">
                        {data.heading}
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-white w-full sm:w-3/4">
                        {data.subheading}
                    </p>
                </div>
            </div>
        </div>
    )
}