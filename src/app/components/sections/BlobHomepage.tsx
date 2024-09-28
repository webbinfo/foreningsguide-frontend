import { blobMapper } from "@/app/utils/colormapper";
import Media from "../Media";
import RichText from "../RichText";
import Button from "../Button";
import { BlobHomepageProps } from "../../utils/interfaces";

export default function BlobHomepage({heading, anchor, content, image, buttons, imagePosition, blobColor }: BlobHomepageProps) {

    let imgLeft = false
    if (imagePosition === 'Left') {
        imgLeft = true
    }

    return (
        <section id={anchor} className={`relative py-8 bg-white`}>
            <div className={`${blobMapper(blobColor)} rounded-xl flex flex-col sm:flex-row p-8 py-8 mx-8 sm:mx-24 text-center sm:text-left items-center`}>
                {image && imgLeft && (
                    <div className="w-full h-full mr-12">
                        <Media data={image} />
                    </div>
                )}
                <div className="sm:mr-12">
                    <h2 className="text-l font-bold py-0 pb-5 my-0">{heading}</h2>
                    <RichText content={content} />
                    <div className="flex w-full justify-center pt-4 md:justify-start">
                        {buttons && (
                            buttons.map(button => (
                                <Button key={button.id} id={button.id} text={button.text} link={button.link} newTab={button.newTab} type={button.type} icon={button.icon} divBG={blobColor} />
                            ))
                        )}
                    </div>
                </div>
                {image && !imgLeft && (
                    <div className="w-full h-full">
                        <Media data={image} />
                    </div>
                )}
            </div>
        </section>
    )
}