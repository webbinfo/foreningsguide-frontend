import Link from 'next/link';
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { ButtonProps } from '../utils/interfaces';
import { FaFacebook, FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';

function parseIcon(icon: string | undefined) {
  switch (icon?.toLowerCase()) {
    case "pil":
      return <ArrowRightIcon className='h-5 w-5 ml-2' />

    case "tiktok":
      return <FaTiktok className='h-5 w-5 ml-2' aria-hidden="true"/>

    case "youtube":
      return <FaYoutube className='h-5 w-5 ml-2' aria-hidden="true"/>

    case "facebook":
      return <FaFacebook className='h-5 w-5 ml-2' aria-hidden="true"/>

    case "instagram":
      return <FaInstagram className='h-5 w-5 ml-2' aria-hidden="true"/>

    default:
      return null;
  }
}

function colormapper(divBG: string | undefined, type: string) {

  switch (divBG?.toLowerCase()) {
    case "korall":
      if (type == 'Solid') {
        return 'bg-mint hover:bg-mint-dark text-white py-2'
      }
      else {
        return 'bg-transparent text-white border-mint border-2 hover:bg-mint hover:text-black py-1.5'
      }
    
    case undefined:
      if (type == 'Solid') {
        return 'bg-coral hover:bg-coral-dark text-white py-2'
      } else {
        return 'bg-transparent text-black hover:bg-coral hover:text-white border-coral border-2 py-1.5'
      }

    default:
      if (type == 'Solid') {
        return 'bg-coral hover:bg-coral-dark text-white py-2'
      } else {
        return 'bg-transparent text-white hover:bg-coral hover:text-white border-coral border-2 py-1.5'
      }
  }
}

export default function Button({ text, link, newTab, type, icon, divBG }: ButtonProps) {
  return (
    <Link href={link} target={newTab ? '_blank' : '_self'} passHref className='no-underline'>
      <div className={`flex justify-center items-center px-8 font-semibold rounded-full cursor-pointer ${colormapper(divBG, type)}`}>
        {icon != "Pil" && icon != undefined ? (
          <span className="mr-2">
            {parseIcon(icon)}
          </span>
        ) : null}
        <span className='text-base'>{text}</span>
        {icon == "Pil" ? (
          <span className="ml-2">
            {parseIcon(icon)}
          </span>
        ) : null}
      </div>
    </Link>
  );
}