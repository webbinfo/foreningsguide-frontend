import { FullWidthTextProps } from "../../utils/interfaces";
import Button from "../Button";
import RichText from "../RichText";

export default function FullWidthText({ anchor, heading, content, buttons }: FullWidthTextProps) {
    return (
        <section id={anchor} className={`relative pt-8 bg-white`}>
            <div className="mx-24">
                <h2 className="pb-4">{heading}</h2>
                <RichText content={content} />
            </div>
            <div className="flex justify-center align-middle py-4 gap-x-2">
                {buttons && (
                    buttons.map(button => (
                        <Button key={button.id} id={button.id} text={button.text} link={button.link} newTab={button.newTab} type={button.type} icon={button.icon} />
                    ))
                )}
            </div>
        </section>
    )
}