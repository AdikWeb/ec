// Дефолтный шаблон страницы
import {DEFAULT_TITLE} from "@/consts/main.const";

import {ReactNode} from "react";
import Head from "next/head";

import TopPanel from "../../components/base/top-panel";

interface DefaultLayoutProps {
    children: ReactNode;
    title?: string;
    pageTitle?: string;
    header?: any
}

const DefaultLayoutPage = ({children, title, pageTitle, header}: DefaultLayoutProps) => {
    return (
        <>
            <Head>
                <title>{title || DEFAULT_TITLE}</title>
            </Head>

            <div className="default-layout page">
                {!header&&<header id="header">
                    <TopPanel />
                </header>}
                {header}
                <main>
                    {pageTitle}
                    { children }
                </main>
            </div>
        </>
    );
}

DefaultLayoutPage.Title = ({children}: DefaultLayoutProps)=>{
    return (<><h1>{children}</h1></>)
}

export default DefaultLayoutPage;