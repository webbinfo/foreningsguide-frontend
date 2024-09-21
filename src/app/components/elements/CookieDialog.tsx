"use client"
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Dialog, DialogPanel, DialogTitle, Description } from "@headlessui/react";
import { Button } from "@headlessui/react";

interface CookieProps {
    data: {
        heading: string;
        content: string;
        buttonText: string;
    }

}

export function CookieDialog({ data }: CookieProps) {
    const [isCookieConsent, setIsCookieConsent] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const consent = Cookies.get("cookieConsent");
        if (consent === "true") {
            setIsCookieConsent(true);
            setIsOpen(false);
            updateGoogleConsent("granted");
        } else {
            updateGoogleConsent("denied");
        }
    }, []);

    const handleAcceptCookies = () => {
        Cookies.set("cookieConsent", "true", { expires: 365 });
        setIsCookieConsent(true);
        setIsOpen(false);
        updateGoogleConsent("granted");
    };

    const handleClose = () => {
        // Disabled to prevent user from not accepting cookies
        //setIsOpen(false);
    }

    const updateGoogleConsent = (consentStatus: string) => {
        if (typeof window !== "undefined") {
            window.gtag('consent', 'update', {
                ad_storage: consentStatus,
                analytics_storage: consentStatus,
            });
        }
    };

    return (
        <Dialog open={isOpen} as="div" className={"relative z-50 "} onClose={handleClose}>
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel transition className={"bg-mint p-8 rounded-lg"}>
                    <DialogTitle>{data.heading}</DialogTitle>
                    <Description>{data.content}</Description>
                    <div className="mt-4">
                        <Button
                            className="inline-flex items-center gap-2 rounded-md bg-blue py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                            onClick={handleAcceptCookies}
                        >
                            {data.buttonText}
                        </Button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}