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
                    <div className={`flex flex-col sm:mr-12 ${sidenote.length>0 ? 'lg:w-1/2' : 'lg:w-full'} ${useBG ? 'bg-mint rounded-lg mx-8' : ''} p-8 py-8`}>
                        <h4 className="text-l font-bold py-0 pb-5 my-0">{heading}</h4>
                        <RichText content={content} checkDict={true} dictionaryItems={dictionaryItems} />
                    </div>
                    <div className="p-8 w-full lg:p-0 lg:pl-4 content-center lg:w-1/4 xl:w-1/3 pt-4 lg:pt-0">
                        {(sidenote.map((note, index) => (
                            <SideNote key={index} {...note} />
                        )))}
                    </div>
                </div>
            </div>
        </section>
    )
}