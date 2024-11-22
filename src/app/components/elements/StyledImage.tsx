import { getStrapiMedia } from "../../utils/api-helpers";
import Image from "next/image";

interface StyledImageProps {
  imageSrc: string;
  altText: string;
}

export default function StyledImage({ imageSrc, altText }: StyledImageProps) {
    const mediaUrl = getStrapiMedia(imageSrc);

    return (
        <div className="relative w-72 h-72 flex justify-center items-center overflow-visible">
        {/* Blob SVG as background */}
        <Image
          src="/blob-shape.svg"
          alt="Blob background"
          className="absolute inset-0 w-full h-full rotate-12 z-0"
          width={100}
          height={100}
        />
  
        {/* Image */}
        <Image
          src={mediaUrl || ""}
          alt={altText || "Missing alt text"}
          className="w-11/12 h-11/12 z-10 test-clip-path overflow-visible"
          width={500}
          height={500}
        />
      </div>
    );
  }
  