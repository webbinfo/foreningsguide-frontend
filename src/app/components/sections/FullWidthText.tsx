import { FullWidthTextProps } from "../../utils/interfaces";
import RichText from "../RichText";

export default function FullWidthText({ anchor, heading, content }: FullWidthTextProps) {
    return (
        <section id={anchor} className={`relative pt-8 bg-white`}>
            <div className="mx-24">
                <h2 className="pb-4">{heading}</h2>
                <RichText content={content} />
            </div>
        </section>
    )
}