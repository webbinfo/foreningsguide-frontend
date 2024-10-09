import { FullWidthTextProps } from "../../utils/interfaces";
import RichText from "../RichText";

export default function FullWidthText({ anchor, heading, content }: FullWidthTextProps) {
    return (
        <section id={anchor} className={`relative pt-8 bg-white w-full md:w-3/5`}>
            <div className="mx-10 md:mx-24">
                <h2 className="pb-4">{heading}</h2>
                <RichText content={content} />
            </div>
        </section>
    )
}