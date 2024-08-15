import Link from 'next/link';
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { ButtonProps } from '../utils/interfaces';

function parseIcon(icon: string | undefined) {
  switch (icon?.toLowerCase()) {
    case "pil":
      return <ArrowRightIcon className='h-5 w-5 ml-2' />

    case "tiktok":
      return null

    case "youtube":
      return null

    case "facebook":
      return null

    case "instagram":
      return null

    default:
      return null;
  }
}

export default function Button({ text, link, newTab, type, icon }: ButtonProps) {
  return (
    <Link href={link} target={newTab ? '_blank' : '_self'} passHref className='no-underline'>
      <div className={`flex justify-center items-center px-12 py-2 font-semibold rounded-full cursor-pointer ${type === 'Solid' ?
        'bg-coral hover:bg-coral-dark text-white' :
        'text-black hover:bg-coral hover:text-white border-coral border-2'}`}>
        {icon != "Pil" && icon != undefined ? (
          <span className="mr-2">
            {parseIcon(icon)}
          </span>
        ) : null}
        <span>{text}</span>
        {icon == "Pil" ? (
          <span className="ml-2">
            {parseIcon(icon)}
          </span>
        ) : null}
      </div>
    </Link>
  );
}