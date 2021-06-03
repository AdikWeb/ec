import {ReactNode} from "react";
import Link from "next/link";

interface DefaultProps {
    children: ReactNode;
    className?: string;
}

interface TrCatalogItemProps {
    title: string;
    src: string;
    href: string;
}

export const TrCatalogItem = ({src, href, title}: TrCatalogItemProps) => {
    return (
        <>
            <Link href={href}>
                <a className={'tr-catalog__item grow-1'}>
                    <div>
                        <img src={src} alt={title}/>
                        <h3>{title}</h3>
                    </div>
                </a>
            </Link>
        </>
    );
}

const TrCatalog = ({children, className}: DefaultProps) => {
    return (
        <>
            <div className={(className+' '+'tr-catalog').trim()}>
                <div className="item d-flex align-items-center">
                    {children}
                </div>
            </div>
        </>
    );
}

export default TrCatalog;