import { FullWidthTextProps } from "../../utils/interfaces";
import Button from "../Button";
import ButtonGroup from "../elements/ButtonGroup";
import RichText from "../RichText";

export default function FullWidthText({ anchor, heading, content, buttons }: FullWidthTextProps) {
    return (
        <section id={anchor} className={`relative pt-8 bg-white`}>
            <div className="mx-8 sm:mx-24">
                <h2 className="pb-4">{heading}</h2>
                <RichText content={content} />
            </div>
            <ButtonGroup buttons={buttons} />
        </section>
    )
}