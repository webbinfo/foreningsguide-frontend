"use client";
import { usePathname } from "next/navigation";
import Logo from "../Logo";
import Link from "next/link";
import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { ArrowRightIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Button from "../Button";
import { ButtonProps } from "../../utils/interfaces";

interface NavLink {
    id: number;
    link: string;
    newTab: boolean;
    text: string;
}

interface MobileNavLink extends NavLink {
    closeMenu: () => void;
}

function NavLink({ link, text }: NavLink) {
    const path = usePathname();

    return (
        <li className="flex">
            <Link
                href={link}
                className={`flex font-semibold items-center mx-4 ${path === link ? "border-sCoral" : "border-transparent"
                    } hover:border-coral hover:text-coral hover:border-b-2 animate-border-slide duration-300`}
            >
                {text}
            </Link>
        </li>
    );
}

function MobileNavLink({ link, text, closeMenu }: MobileNavLink) {
    const path = usePathname();
    const handleClick = () => {
        closeMenu();
    };

    return (
        <a className="flex">
            <Link
                href={link}
                onClick={handleClick}
                className={`flex items-center mx-4 -mb-1 ${path === link ? "border-sCoral" : "border-transparent"
                    }}`}
            >
                {text}
            </Link>
        </a>
    );
}

export default function Navbar({
    links,
    logoUrl,
    logoText,
    button,
}: {
    links: Array<NavLink>;
    logoUrl: string | null;
    logoText: string | null;
    button: ButtonProps | null;
}) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const closeMenu = () => {
        setMobileMenuOpen(false);
    };
    return (
        <div className="p-4 bg-white text-black border-t-coral border-t-4 sticky top-0 z-40 no-underline-links drop-shadow-lg">
            <div className="flex justify-between h-16 mx-auto 2xl:mx-8 px-0 sm:px-6">
                <Logo src={logoUrl}>
                    {logoText && <span className="text-m font-semibold text-blue sm:text-xl">{logoText}</span>}
                </Logo>

                <div className="items-center flex-shrink-0 hidden lg:flex">
                    <ul className="items-stretch text-lg hidden space-x-6 lg:flex">
                        {links.map((items: NavLink) => (
                            <NavLink key={items.id} {...items} />
                        ))}
                        {button ? <Button
                            id={button.id}
                            text={button.text}
                            link={button.link}
                            type={button.type}
                            icon={button.icon}
                            newTab={button.newTab}
                        />
                            : null}
                    </ul>
                </div>

                {/* Mobile menu */}
                <Dialog
                    as="div"
                    className="lg:hidden no-underline-links"
                    open={mobileMenuOpen}
                    onClose={setMobileMenuOpen}
                >
                    <div className="fixed inset-0 z-40 bg-coral bg-opacity-20" /> {" "}
                    {/* Overlay */}
                    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-80 overflow-y-auto bg-white text-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-inset sm:ring-white/10">
                        <div className="text-end pr-8">
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-4xl"
                            >
                                <XMarkIcon className="h-7 w-7 text-black" aria-hidden="true" />
                            </button>
                        </div>
                        <ul className="mt-6 text-xl font-semibold space-y-4">
                            {links.map((items: NavLink) => (
                                <MobileNavLink key={items.id} {...items} closeMenu={closeMenu} />
                            ))}
                            <div className="pt-2 pl-4 text-lg text-coral focus:text-coral-dark">
                                {button ?
                                    <div className="flex flex-row space-x-4 align-middle">
                                        <Link href={button.link} target={button.newTab ? "_blank" : "_self"}>{button.text}</Link>
                                        <ArrowRightIcon height={24} width={24} />
                                    </div>
                                    : null}
                            </div>
                        </ul>
                    </DialogPanel>
                </Dialog>
                <button
                    className="p-4 lg:hidden"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <Bars3Icon className="h-7 w-7 text-black" aria-hidden="true" />
                </button>
            </div>
        </div>
    )
}