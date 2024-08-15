import Link from "next/link";

interface TOCProps {
    id: string;
    heading: string;
    level: number;
}

export default function TOC({ data }: { data: Array<TOCProps> }) {
    return (
        <div className="flex flex-col">
            <p className="font-bold -ml-4 pb-4">Innehåll</p>

            <div className="border-l-gray-200 border-l-2 -ml-4 text-sm">
                <ul className={`ml-4 no-underline no-bullet`}>
                    {data.map((item: TOCProps, index: number) => (
                        <li key={index} className={index > 0 ? `mt-2` : ''}>
                            {item.level === 1 ? (
                                <Link href={`#${item.id}`}>{item.heading}</Link>
                            ) : (
                                <ul className="no-bullet">
                                    <li key={index} className="ml-2 -mt-2">
                                        <Link href={`#${item.id}`}>{item.heading}</Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}