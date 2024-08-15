import { NoteProps } from "../../utils/interfaces"
import RichText from "../RichText"


function categorizeType(type: string) {
    switch (type) {
        case "Kommentar":
            return "bg-coral"
        case "Exempel":
            return "bg-blue text-white"
        case "Tips":
            return "bg-yellow"
        default:
            return "bg-red-500"
    
    }
}

export default function SideNote(note: NoteProps) {
    
    return (
        <div className="flex flex-row">
        <hr className={'lg:border-gray-300 lg:border-2 lg:my-auto lg:px-12 lg:-mx-16'} />
        <div className={`${categorizeType(note.type)} p-8 rounded-lg mb-4 text-sm`}>
            <h3 className="text-md font-bold py-0 pb-5 my-0">{note.heading}</h3>
            <RichText content={note.content} />
        </div>
        </div>
        
    )
}