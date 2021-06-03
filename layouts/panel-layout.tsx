import {DEFAULT_TITLE} from "@/consts/main.const";
import {ReactNode, useEffect} from "react";
import Head from "next/head";
import AdminTopPanel from "@/components/base/admin-top-panel";
import {connect} from "react-redux";
import {useRouter} from "next/router";

interface DefaultLayoutProps {
    children: ReactNode;
    title?: string;
    user?: any;
}

const PanelLayout = ({children, title, user}: DefaultLayoutProps) => {
    const router = useRouter()
    const checkUser = () => {
        if (user.authChecked && !user.userRole.includes("admin")) router.push('/login').then(r => r);
    }

    useEffect(() => {
        checkUser();
    }, [user.authChecked, user.userRole])

    return (
        <>
            <Head>
                <title>{title || DEFAULT_TITLE}</title>
            </Head>
            <div className="panel-layout">
                <header id="header">
                    <AdminTopPanel />
                </header>
                <main>
                    {children}
                </main>
            </div>
        </>
    );
}

interface IProps {
    user: any,
}

const  mapStateToProps = ({user}:IProps) => ({
    user
});

export default connect(mapStateToProps, null)(PanelLayout);