"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { BannerProps } from "../../utils/interfaces";
import Link from "next/link";
import { useState } from "react";

function colorMapper(type: string) {
    switch (type) {
        case "Info":
            return "bg-mint text-black";
        case "Warning":
            return "bg-yellow text-black";
        case "Alert":
            return "bg-coral text-white";
        default:
            return "bg-mint text-black";
    }
}

export default function Banner({ data }: BannerProps) {
    const [isOpen, setIsOpen] = useState(true); // Initially set to true

    if (!data) return null;
    const { heading, text, type, showStart, showStop, link } = data;
    const today = new Date();
    const show = today >= new Date(showStart) && today <= new Date(showStop);

    if (!show || !isOpen) {
        return null;
    }

    return (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8">
            <div className={`pointer-events-auto flex items-center justify-between gap-x-6 py-2.5 px-6 sm:rounded-full sm:py-3 sm:px-6 ${colorMapper(type)}`}>
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between">
                        <p className="text-sm leading-6 font-bold">{heading}</p>
                        <XMarkIcon
                            height={16}
                            width={16}
                            className="h-5 w-5 text-white cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        />
                    </div>
                    <p className="text-sm leading-6">
                        <Link href={link.link} target={link.newTab ? "_blank" : "_self"} className="text-white underline">
                            {text}&nbsp;
                            <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
