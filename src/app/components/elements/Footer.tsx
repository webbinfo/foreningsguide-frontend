import Link from "next/link";
import { FooterProps, LinkPicture, Picture } from "../../utils/interfaces";
import { type BlocksContent } from "@strapi/blocks-react-renderer";
import RichText from "../RichText";
import LinkedLogo from "../LinkedLogo";
import Image from "next/image";
import { getStrapiMedia } from "../../utils/api-helpers";

interface LeftFooterProps {
    data: {
        id: number;
        heading: string;
        content: BlocksContent;
        sponsoredLogo: Picture;
    }
}

interface MiddleFooterProps {
    data: {
        id: number;
        middleTopTitle: string;
        middleBottomTitle: string;
        middleTopLogos: Array<LinkPicture>;
        middleBottomLogos: Array<LinkPicture>;
        middleBottomLogoSpotlight: LinkPicture;
    }
}

interface RightFooterProps {
    data: {
        id: number;
        heading: string;
        content: BlocksContent;
        copyright: string;
        developedByText: string;
        developedBy: string;
        developedByLink: string;
        copyrightLink: string;
    }
}

function LeftFooter(data: LeftFooterProps) {
    const imgURL = getStrapiMedia(data.data.sponsoredLogo.data.attributes.url);

    return (
        <div className="flex flex-col items-center md:text-left w-full pb-8 md:w-1/5 md:pb-0">
            <h2 className="text-m font-bold pb-4">{data.data.heading}</h2>
            <div className="pb-8">
                <RichText content={data.data.content} />
            </div>
            <Image src={imgURL || ""} alt={data.data.sponsoredLogo.data.attributes.alternativeText || "KOMBO Logo"} width={160} height={40} />
        </div>
    );
}

function MiddleFooter(data: MiddleFooterProps) {
    const logoWidth = 160;
    const logoHeight = 40;

    return (
        <div className="flex flex-col w-full mx-8 pb-8 md:text-left md:w-2/5 md:pb-0 md:ml-24">
            <h2 className="text-m font-bold pb-4">{data.data.middleTopTitle}</h2>
            <div className="grid grid-cols-3 gap-4 sm:flex sm:flex-row">
                {data.data.middleTopLogos.map((logo) => (
                    <LinkedLogo
                        key={logo.id}
                        data={logo}
                        thumbnail={true}
                        width={logoWidth}
                        height={logoHeight}
                    />
                ))}
            </div>
            <h2 className="text-m font-bold pb-4 pt-12">{data.data.middleBottomTitle}</h2>
            <div className="flex flex-col justify-center md:flex-row">
                <div className="flex justify-center">
                    {data.data.middleBottomLogoSpotlight && <LinkedLogo
                        key={data.data.middleBottomLogoSpotlight.id}
                        data={data.data.middleBottomLogoSpotlight}
                        thumbnail={false}
                        width={logoWidth*2}
                        height={logoHeight*2}
                    />}
                </div>
                <div className="grid grid-cols-3 gap-4 sm:flex sm:flex-row">
                    {data.data.middleBottomLogos.map((logo) => (
                        <LinkedLogo
                            key={logo.id}
                            data={logo}
                            thumbnail={true}
                            width={logoWidth}
                            height={logoHeight}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

function RightFooter(data: RightFooterProps) {
    return (
        <div className="flex flex-col w-full pb-8 md:text-left md:w-2/5 md:pb-0 md:ml-24">
            <h2 className="text-m font-bold pb-4">{data.data.heading}</h2>
            <div className="b-8">
                <RichText content={data.data.content} />
            </div>
            <div className="flex flex-row justify-between pt-8 xl:flex-col">
                <p><span>&copy;</span> <Link href={data.data.copyrightLink} target="_blank">{data.data.copyright}</Link> </p>
                <p className="xl:mt-4">{data.data.developedByText} <Link href={data.data.developedByLink}>{data.data.developedBy}</Link></p>
            </div>
        </div>
    );

}

export default function Footer(src: FooterProps) {
    return (
        <div className="bg-white">
            <footer className="bg-footer-gradient-coral">
                <div className="bg-footer-gradient-black w-full h-full text-white p-8 text-center">
                    <div className="flex flex-col w-full md:flex-row items-center justify-center md:items-start xl:px-24">
                        <LeftFooter data={src.data.left} />
                        <MiddleFooter data={src.data} />
                        <RightFooter data={src.data.right} />
                    </div>

                </div>

            </footer>
        </div>
    );
}