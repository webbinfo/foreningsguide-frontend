import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { getStrapiMedia } from "../utils/api-helpers";
import { Picture } from "../utils/interfaces";
import Button from "./Button";
import Image from "next/image";

interface CourseCardProps {
    id: number;
    name: string;
    slug: string;
    introduction: string;
    coverImage: Picture;
    completed: boolean;
}

export default function CourseCard({ name, slug, introduction, coverImage, completed, id }: CourseCardProps) {
    const imgURL = getStrapiMedia(coverImage.data?.attributes.formats.small.url);

    return (
        <div className="bg-mint rounded-lg p-8 flex flex-col h-full">
            <div className={`flex flex-col flex-grow ${completed ? 'bg-white/5 opacity-50' : ''}`}>
                {imgURL && (
                    <Image
                        src={imgURL}
                        alt={coverImage.data.attributes.alternativeText || "Course cover image"}
                        width={250}
                        height={250}
                        className="mb-4 w-full rounded-lg"
                    />
                )}
                <h2 className="font-bold text-xl pb-4">{name}</h2>
                <p className="pb-4 flex-grow">{introduction}</p>
                <div className="mt-auto">
                    <div className="w-full flex justify-center">
                        <Button id={id} text="Starta guiden" link={`guider/${slug}`} type="Solid" newTab={false} icon={"Pil"} />
                    </div>
                    {completed && (
                        <div className="flex justify-center items-center pt-4">
                            <div className="flex flex-row items-center">
                                <CheckBadgeIcon height={16} width={16} className="text-green-500 z-20 h-8 w-8" />
                                <p className="text-sm text-center ml-2">Guiden är avklarad</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}