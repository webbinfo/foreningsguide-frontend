import { blobMapper } from "@/app/utils/colormapper";
import { BlobWithBGProps } from "../../utils/interfaces";
import Media from "../Media";
import RichText from "../RichText";
import Button from "../Button";

export default function BlobWithBG({ background, layout, blobColor, heading, anchor, content, image, buttons }: BlobWithBGProps) {

    // TODO: Implement layout
    return (
        <section id={anchor} className={`relative ${blobMapper(background)} py-8`}>
            <div className={`${blobMapper(blobColor)} rounded-xl flex flex-col sm:flex-row p-8 py-8 mx-8 sm:mx-24 text-center sm:text-left items-center`}>
                <div className="sm:mr-12">
                    <h2 className="text-l font-bold py-0 pb-5 my-0">{heading}</h2>
                    <RichText content={content} />
                    <div className="flex w-full justify-center pt-4 md:justify-start">
                        {buttons && (
                            buttons.map(button => (
                                <Button key={button.id} id={button.id} text={button.text} link={button.link} newTab={button.newTab} type={button.type} icon={button.icon} />
                            ))
                        )}
                    </div>
                </div>
                {image && (
                    <div className="w-full h-full">
                        <Media data={image} />
                    </div>
                )}
            </div>
        </section>
    )
}