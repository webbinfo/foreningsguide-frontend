"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { BannerProps } from "../../utils/interfaces";
import Link from "next/link";
import { useState } from "react";

function colorMapper(type: string) {
    switch (type) {
        case "Info":
            return "bg-mint text-black border-t-mint-dark";
        case "Warning":
            return "bg-yellow text-black border-t-yellow-dark";
        case "Alert":
            return "bg-coral text-white border-t-coral-dark";
        default:
            return "bg-mint text-black border-t-mint-dark";
    }
}

export default function Banner({ data }: BannerProps) {
    const [isOpen, setIsOpen] = useState(true); // Initially set to true

    if (!data) return null;
    const { heading, content, type, startDate, endDate, link } = data;
    const today = new Date();
    const show = today >= new Date(startDate) && today <= new Date(endDate);

    console.log("Banner", startDate, today);

    if (!show || !isOpen) {
        return null;
    }

    return (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8">
            <div className={`pointer-events-auto flex items-center justify-between gap-x-6 py-3 px-8 sm:rounded-full ${colorMapper(type)} border-t-2  shadow-inner sm:shadow-xl`}>
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between">
                        <p className="text-md leading-6 font-bold">{heading}</p>
                        <XMarkIcon
                            height={16}
                            width={16}
                            className={`h-5 w-5 cursor-pointer ${type === "Alert" ? "text-white" : "text-black"}`}
                            onClick={() => setIsOpen(false)}
                        />
                    </div>
                    <p className="leading-6">
                        <Link href={link.link} target={link.newTab ? "_blank" : "_self"} className={`${type === "Alert" ? "text-white" : "text-black"} text-sm`}>
                            {content}&nbsp;
                            <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
