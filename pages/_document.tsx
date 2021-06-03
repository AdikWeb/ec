import Document, { Html, Head, Main, NextScript } from 'next/document'
import {DEFAULT_TITLE} from "@/consts/main.const";

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <title>{ DEFAULT_TITLE }</title>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300&display=swap" rel="stylesheet" />
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
