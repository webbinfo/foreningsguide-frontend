import Link from 'next/link';
import Image from 'next/image';

export default function Logo({
    src,
    children,
}: {
    src: string | null;
    children: React.ReactNode;
}) {
    return (
        <Link
            href="/"
            aria-label='Back to homepage'
            className='flex items-center p-2'
        >
            {src && <div className='max-w-36 sm:max-w-72'><Image src={src} alt="logo" width={48} height={48}/></div>}
            <div className='ml-2 text-s'>{children}</div>
        </Link>
    )
}