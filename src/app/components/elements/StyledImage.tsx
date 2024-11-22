import { getStrapiMedia } from "../../utils/api-helpers";
import Image from "next/image";

interface StyledImageProps {
  imageSrc: string;
  altText: string;
  size: 'Stor bild' | 'Liten bild';
}

export default function StyledImage({ imageSrc, altText, size }: StyledImageProps) {
    const mediaUrl = getStrapiMedia(imageSrc);

    return (
        <div className={`relative z-20 w-52 h-52 xl:w-72 xl:h-72 flex justify-center items-center overflow-visible mb-4 xl:mb-0 ${size == "Stor bild" ? "mt-8 scale-110 xl:scale-150 xl:ml-16 xl:mt-0" : "scale-100 xl:ml-0"}`}>
        {/* Blob SVG as background */}
        <Image
          src="/blob-shape.svg"
          alt="Blob background"
          className="absolute inset-0 w-full h-full -rotate-45 z-0 scale-110"
          width={150}
          height={150}
        />
  
        {/* Image */}
        <div className="relative w-full max-w-4xl aspect-square mx-auto translate-x-8 translate-y-8 scale-125">
            {/* Embedding SVG as a mask */}
            <svg
                viewBox="0 0 1000 1000"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 w-full h-full"
            >
                <defs>
                <clipPath id="blobClip">
                    <path d="M94.1,282C37,399.9-26.3,530.1,11.4,624.3c36.8,93.7,175.1,150.5,316.1,167 c140.1,16,282.8-8.3,381.6-92.5C808.2,615.4,864,471.9,841,350S717,128.5,605.3,66.2S372.1-20.5,285.7,19.4 C200.2,59.8,150.5,164.3,94.1,282z" />
                </clipPath>
                </defs>
                <image
                    href={mediaUrl || ""}
                    aria-label={altText}
                    clipPath="url(#blobClip)"
                    width="1000"
                    height="1000"
                    preserveAspectRatio="xMidYMid slice"
                />
            </svg>
        </div>
      </div>
    );
  }
  