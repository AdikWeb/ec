import {ReactNode, useEffect, useRef, useState} from "react";

interface AdvancedMenuProps {
    children: ReactNode,
    showHamburger?: boolean,
    className?: string
}

interface MenuProps {
    children: ReactNode,
    className?: string,
    hamburger?: ReactNode
}

const CreateTopNav = () => {
    const defMenu = ({children, className}: MenuProps) => (<>
        <nav className={(className + ' ' + 'top-nav d-flex align-items-center').trim()}>
            {children}
        </nav>
    </>);
    defMenu.advanced = ({children, showHamburger, className}: AdvancedMenuProps) => {
        const [advancedMenuState, setAdvancedMenuState] = useState<boolean>(false);

        const hamburgerBtn = useRef<any>(null);
        const advancedMenu = useRef<any>(null);

        const ToggleMenu = (e: any) => {
            if (advancedMenu.current && !advancedMenu.current.contains(e.target))
                if(hamburgerBtn.current && !hamburgerBtn.current.contains(e.target))
                    setAdvancedMenuState(false);
        }

        useEffect(() => {
            document.addEventListener("mousedown", ToggleMenu);
        }, [hamburgerBtn, advancedMenu]);

        return (<>{showHamburger &&
        <button
            ref={hamburgerBtn}
            onClick={()=>setAdvancedMenuState(!advancedMenuState)}
            className={('top-nav__advanced-hamburger ' + className + ' ' + (advancedMenuState ? 'active' : '')).trim()}>
            <span/><span/><span/></button>}

            {advancedMenuState &&
            <div
                ref={advancedMenu}
                className={('top-nav__advanced ' + (advancedMenuState ? 'active' : '')).trim()}>
                {children}
            </div>}
        </>);
    }

    return defMenu;
}

const TopNav = CreateTopNav();
export default TopNav;