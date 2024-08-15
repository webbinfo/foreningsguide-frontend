import Link from 'next/link';
import Image from 'next/image';
import {LinkPicture} from '../utils/interfaces';
import {getStrapiMedia} from '../utils/api-helpers';

export default function LinkedLogo({ data, thumbnail, width, height, className } : { data: LinkPicture, thumbnail: boolean, width: number, height: number, className?: string }) {
    const imgURL = getStrapiMedia(thumbnail ? data.image.data.attributes.formats.thumbnail.url : data.image.data.attributes.url);

    if (className == null || className == "") {
        className = "flex items-center p-2"
    }

    return (
        <Link
            href={data.link}
            target={data.newTab ? '_blank' : '_self'}
            className={className}
        >
            {data.image && <Image src={imgURL || ""} alt={data.image.data.attributes.alternativeText || "Missing alt text"} width={width} height={height}/>}
        </Link>
    )
}