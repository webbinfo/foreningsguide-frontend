import { blobMapper } from "@/app/utils/colormapper";
import { BlobWithBGProps } from "../../utils/interfaces";
import Media from "../Media";
import RichText from "../RichText";
import ButtonGroup from "../elements/ButtonGroup";

export default function BlobWithBG({ background, layout, blobColor, heading, anchor, content, image, buttons }: BlobWithBGProps) {

    let imgLeft = false
    if (layout === 'Image to left' || layout === 'Image to left (with shape)') {
        imgLeft = true
    }

    return (
        <section id={anchor} className={`relative ${blobMapper(background)} py-8`}>
            <div className={`${blobMapper(blobColor)} rounded-xl flex flex-col md:flex-row p-6 md:p-12 py-4 mx-4 md:mx-24 text-center md:text-left items-center`}>
                {image.data && imgLeft && (
                    <div className="w-full h-full mr-12 mb-4 mx-auto max-w-xl">
                        <Media data={image} />
                    </div>
                )}
                <div className="md:mr-12">
                    <h2 className="text-l font-bold py-0 pb-5 my-0">{heading}</h2>
                    <div className="md:max-w-4xl xl:max-w-full">
                        <RichText content={content}/>
                    </div>
                    <div className="md:float-start mt-4">
                        <ButtonGroup buttons={buttons} divBG={blobColor} />
                    </div>
                </div>
                {image.data && !imgLeft && (
                    <div className="w-full h-full mb-4 max-w-xl">
                        <Media data={image} />
                    </div>
                )}
            </div>
        </section>
    )
}