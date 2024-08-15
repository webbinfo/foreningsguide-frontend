import { TwoColProps } from "@/app/utils/interfaces";
import RichText from "../RichText";
import { blobMapper } from "@/app/utils/colormapper";


export default function TwoCols({ heading, background, leftColumnWidth, leftContent, rightContent }: TwoColProps) {

    return (
        <section className={`${blobMapper(background)} py-8`}>
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center">{heading}</h2>
                <div className="flex flex-col sm:flex-row text-center">
                    <div className={`w-full sm:w-${leftColumnWidth}/12 p-8`}>
                        <RichText content={leftContent} />
                    </div>
                    <div className={`w-full sm:w-${12 - leftColumnWidth}/12 p-8`}>
                        <RichText content={rightContent} />
                    </div>
                </div>
            </div>
        </section>
    )
}