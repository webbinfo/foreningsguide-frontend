import { CourseTextBlockProps } from "../../utils/interfaces";
import Media from "../Media";
import RichText from "../RichText";
import SideNote from "../elements/SideNote";

export default function CourseTextBlock({ id, heading, level, content, sidenote, dictionaryItems}: CourseTextBlockProps) {
    const useBG = level === 2;

    return (
        <section id={id}>
            <div className={`flex flex-col lg:flex-row sm:mx-24 text-black w-full mb-4`}>
                <div className={`lg:flex lg:flex-row`}>
                    <div className={`flex flex-col my-auto sm:mr-12 ${sidenote.length>0 ? 'lg:w-1/2' : 'lg:w-full'} ${useBG ? 'bg-mint rounded-lg mx-8' : ''} p-8 py-8`}>
                        <h4 className="text-l font-bold py-0 pb-5 my-0">{heading}</h4>
                        <RichText content={content} checkDict={true} dictionaryItems={dictionaryItems} />
                    </div>
                    <div className="lg:pl-4 lg:-mr-16 content-center lg:w-1/4">
                        {(sidenote.map((note, index) => (
                            <SideNote key={index} {...note} />
                        )))}
                    </div>
                </div>
            </div>
        </section>
    )
}