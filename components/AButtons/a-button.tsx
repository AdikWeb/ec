import {ReactNode} from "react";

interface AButtonProps {
    children: ReactNode;
    variant?: string;
    className?: string;
}

const AButton = ({children, variant, className}: AButtonProps) => {
    const variantArray = () => {
        if (variant && [
            'white',
            'black',
            'primary',
            'danger',
            'warning',
            'link'
        ].includes(variant)) return variant;
        return "default";
    }

    return (
        <>
            <button className={'a-btn ' + (className || '' + ' ' + variantArray()).trim()}>
                {children}
            </button>
        </>
    )
}

export default AButton;