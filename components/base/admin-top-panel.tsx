import {Button, Container, Icon, Input} from "semantic-ui-react";
import Link from "next/link";
import {SHOW_AUTH_MODAL} from "@/redux/user/user.const";
import {LOGOUT_USER_API} from "@/api/user/user.api";
import TopNav from "@/components/base/top-nav";
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import SearchInput from "@/components/base/search-input";
const AdminTopPanel = ({dispatch}: any)=>{
    const [authCheck, setAuthCheck] = useState<boolean>(false);

    useEffect(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth, (user)=>{
            setAuthCheck(!!auth.currentUser);
        })

        return ()=>{}
    }, [])

    return (
        <>
            <div className="top-panel">
                <Container>
                    <div className="d-flex align-items-center">
                        <Link href={'/'}>
                            <a>
                                <svg width="174" height="50" viewBox="0 0 174 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 31.7879V19.0253C7 18.473 7.44772 18.0253 8 18.0253H17.0253C17.5775 18.0253 18.0253 17.5775 18.0253 17.0253V8C18.0253 7.44772 18.473 7 19.0253 7H31.7879C32.3402 7 32.7879 7.44772 32.7879 8V17.0253C32.7879 17.5775 33.2356 18.0253 33.7879 18.0253H43C43.5523 18.0253 44 18.473 44 19.0253V31.7879C44 32.3402 43.5523 32.7879 43 32.7879H33.7879C33.2356 32.7879 32.7879 33.2356 32.7879 33.7879V43C32.7879 43.5523 32.3402 44 31.7879 44H19.0253C18.473 44 18.0253 43.5523 18.0253 43V33.7879C18.0253 33.2356 17.5775 32.7879 17.0253 32.7879H8C7.44772 32.7879 7 32.3402 7 31.7879Z" fill="#F0F0F0" stroke="#21BA45" strokeWidth="2"/>
                                    <path d="M17.7174 28.5795V22.4708H22.2796V17.9086H28.3883V22.4708H33.0278V28.5795H28.3883V33.219H22.2796V28.5795H17.7174Z" fill="#EF5959"/>
                                    <path d="M62.0859 13.6992C61.4609 13.6992 60.8555 13.7695 60.2695 13.9102C59.6914 14.043 59.0586 14.2773 58.3711 14.6133L57.8906 13.5352C59.1719 12.9258 60.6094 12.6211 62.2031 12.6211C64.7344 12.6211 66.7188 13.3711 68.1562 14.8711C69.6016 16.3711 70.3242 18.4219 70.3242 21.0234C70.3242 22.8906 70 24.5195 69.3516 25.9102C68.7031 27.3008 67.7656 28.3711 66.5391 29.1211C65.3203 29.8633 63.9102 30.2344 62.3086 30.2344C60.4492 30.2344 58.9531 30.0352 57.8203 29.6367V28.5352C59.125 28.9336 60.5469 29.1328 62.0859 29.1328C64.1953 29.1328 65.8555 28.4727 67.0664 27.1523C68.2773 25.832 68.9375 23.9727 69.0469 21.5742H59.9766V20.4727H69.0234C68.8516 18.3008 68.168 16.6289 66.9727 15.457C65.7852 14.2852 64.1562 13.6992 62.0859 13.6992ZM85.5586 30H83.9297L75.457 21.2695V30H74.2617V12.8672H75.457V21.1641L83.6953 12.8672H85.2773L76.9922 21.1641L85.5586 30ZM102.398 21.4102C102.398 24.1289 101.719 26.2812 100.359 27.8672C99 29.4453 97.125 30.2344 94.7344 30.2344C92.3516 30.2344 90.4805 29.4453 89.1211 27.8672C87.7617 26.2812 87.082 24.1211 87.082 21.3867C87.082 18.6602 87.7656 16.5156 89.1328 14.9531C90.5078 13.3828 92.3828 12.5977 94.7578 12.5977C97.1484 12.5977 99.0195 13.3867 100.371 14.9648C101.723 16.5352 102.398 18.6836 102.398 21.4102ZM88.3828 21.4102C88.3828 23.8633 88.9297 25.7617 90.0234 27.1055C91.1172 28.4414 92.6875 29.1094 94.7344 29.1094C96.7969 29.1094 98.3711 28.4453 99.457 27.1172C100.551 25.7891 101.098 23.8867 101.098 21.4102C101.098 18.9414 100.551 17.0508 99.457 15.7383C98.3711 14.418 96.8047 13.7578 94.7578 13.7578C92.7188 13.7578 91.1445 14.4219 90.0352 15.75C88.9336 17.0781 88.3828 18.9648 88.3828 21.4102ZM118.758 30H117.551V21.5742H107.543V30H106.348V12.8672H107.543V20.4727H117.551V12.8672H118.758V30ZM138.023 21.4102C138.023 24.1289 137.344 26.2812 135.984 27.8672C134.625 29.4453 132.75 30.2344 130.359 30.2344C127.977 30.2344 126.105 29.4453 124.746 27.8672C123.387 26.2812 122.707 24.1211 122.707 21.3867C122.707 18.6602 123.391 16.5156 124.758 14.9531C126.133 13.3828 128.008 12.5977 130.383 12.5977C132.773 12.5977 134.645 13.3867 135.996 14.9648C137.348 16.5352 138.023 18.6836 138.023 21.4102ZM124.008 21.4102C124.008 23.8633 124.555 25.7617 125.648 27.1055C126.742 28.4414 128.312 29.1094 130.359 29.1094C132.422 29.1094 133.996 28.4453 135.082 27.1172C136.176 25.7891 136.723 23.8867 136.723 21.4102C136.723 18.9414 136.176 17.0508 135.082 15.7383C133.996 14.418 132.43 13.7578 130.383 13.7578C128.344 13.7578 126.77 14.4219 125.66 15.75C124.559 17.0781 124.008 18.9648 124.008 21.4102ZM149.508 30L143.121 14.1797H143.027C143.09 15.1484 143.121 16.1406 143.121 17.1562V30H141.973V12.8672H143.824L149.895 27.9375H149.965L156.035 12.8672H157.84V30H156.633V17.0156C156.633 16.1094 156.68 15.1719 156.773 14.2031H156.68L150.27 30H149.508ZM163.887 20.4258H167.344C169.312 20.4258 170.789 20.8008 171.773 21.5508C172.758 22.293 173.25 23.4688 173.25 25.0781C173.25 26.6641 172.766 27.8828 171.797 28.7344C170.828 29.5781 169.434 30 167.613 30H162.691V12.8672H163.887V20.4258ZM163.887 28.9453H167.414C168.953 28.9453 170.094 28.6367 170.836 28.0195C171.578 27.3945 171.949 26.4141 171.949 25.0781C171.949 23.7891 171.574 22.8672 170.824 22.3125C170.074 21.7578 168.859 21.4805 167.18 21.4805H163.887V28.9453Z" fill="#21BA45"/>
                                    <path d="M60.7832 38.1133V41.8462L60.7456 42.8237L60.7295 43.1299L63.9146 38.1133H65.0264V44H64.1938V40.4014L64.21 39.6924L64.2368 38.9941L61.0571 44H59.9453V38.1133H60.7832ZM67.8086 38.1133V40.5786H71.1064V38.1133H71.998V44H71.1064V41.3467H67.8086V44H66.917V38.1133H67.8086ZM77.8579 38.876H75.9458V44H75.0542V38.876H73.1636V38.1133H77.8579V38.876ZM81.5103 44.1074C80.6401 44.1074 79.9526 43.8424 79.4478 43.3125C78.9465 42.7826 78.6958 42.0467 78.6958 41.105C78.6958 40.1561 78.9285 39.4023 79.394 38.8438C79.8631 38.2852 80.4915 38.0059 81.2793 38.0059C82.0169 38.0059 82.6006 38.2493 83.0303 38.7363C83.46 39.2197 83.6748 39.8589 83.6748 40.6538V41.2178H79.6196C79.6375 41.9089 79.8112 42.4334 80.1406 42.7915C80.4736 43.1496 80.9409 43.3286 81.5425 43.3286C82.1763 43.3286 82.8029 43.1961 83.4224 42.9312V43.7261C83.1073 43.8621 82.8083 43.9588 82.5254 44.0161C82.2461 44.077 81.9077 44.1074 81.5103 44.1074ZM81.2686 38.7524C80.7959 38.7524 80.4181 38.9064 80.1353 39.2144C79.856 39.5223 79.6912 39.9484 79.6411 40.4927H82.7188C82.7188 39.9305 82.5934 39.5008 82.3428 39.2036C82.0921 38.9028 81.734 38.7524 81.2686 38.7524ZM87.9395 44.1074C87.5563 44.1074 87.2054 44.0376 86.8867 43.8979C86.5716 43.7547 86.3066 43.5363 86.0918 43.2427H86.0273C86.0703 43.5864 86.0918 43.9123 86.0918 44.2202V46.6426H85.2002V38.1133H85.9253L86.0488 38.9189H86.0918C86.321 38.5967 86.5877 38.3639 86.8921 38.2207C87.1965 38.0775 87.5456 38.0059 87.9395 38.0059C88.7201 38.0059 89.3216 38.2726 89.7441 38.8062C90.1702 39.3397 90.3833 40.0881 90.3833 41.0513C90.3833 42.0181 90.1667 42.77 89.7334 43.3071C89.3037 43.8407 88.7057 44.1074 87.9395 44.1074ZM87.8105 38.7632C87.209 38.7632 86.7739 38.9297 86.5054 39.2627C86.2368 39.5957 86.099 40.1257 86.0918 40.8525V41.0513C86.0918 41.8784 86.2297 42.471 86.5054 42.8291C86.7811 43.1836 87.2233 43.3608 87.832 43.3608C88.3405 43.3608 88.738 43.1549 89.0244 42.7432C89.3145 42.3314 89.4595 41.7638 89.4595 41.0405C89.4595 40.3065 89.3145 39.7443 89.0244 39.354C88.738 38.9601 88.3333 38.7632 87.8105 38.7632ZM92.8379 38.1133V40.5786H96.1357V38.1133H97.0273V44H96.1357V41.3467H92.8379V44H91.9463V38.1133H92.8379ZM101.405 44.1074C100.535 44.1074 99.8472 43.8424 99.3423 43.3125C98.841 42.7826 98.5903 42.0467 98.5903 41.105C98.5903 40.1561 98.8231 39.4023 99.2886 38.8438C99.7576 38.2852 100.386 38.0059 101.174 38.0059C101.911 38.0059 102.495 38.2493 102.925 38.7363C103.354 39.2197 103.569 39.8589 103.569 40.6538V41.2178H99.5142C99.5321 41.9089 99.7057 42.4334 100.035 42.7915C100.368 43.1496 100.835 43.3286 101.437 43.3286C102.071 43.3286 102.697 43.1961 103.317 42.9312V43.7261C103.002 43.8621 102.703 43.9588 102.42 44.0161C102.141 44.077 101.802 44.1074 101.405 44.1074ZM101.163 38.7524C100.69 38.7524 100.313 38.9064 100.03 39.2144C99.7505 39.5223 99.5858 39.9484 99.5356 40.4927H102.613C102.613 39.9305 102.488 39.5008 102.237 39.2036C101.987 38.9028 101.629 38.7524 101.163 38.7524ZM109.064 38.876H107.152V44H106.26V38.876H104.37V38.1133H109.064V38.876ZM109.735 41.4595V40.6431H112.373V41.4595H109.735ZM116.831 43.1406L116.997 42.6411L117.228 42.0073L118.823 38.124H119.957V44H119.167V39.1392L119.06 39.4507L118.748 40.2725L117.228 44H116.481L114.961 40.2617C114.772 39.7819 114.641 39.4077 114.569 39.1392V44H113.774V38.124H114.865L116.406 41.8569C116.56 42.2508 116.702 42.6787 116.831 43.1406ZM125.483 44L125.306 43.1621H125.263C124.97 43.5309 124.676 43.7816 124.382 43.9141C124.092 44.043 123.729 44.1074 123.292 44.1074C122.708 44.1074 122.25 43.957 121.917 43.6562C121.588 43.3555 121.423 42.9276 121.423 42.3726C121.423 41.1838 122.374 40.5607 124.275 40.5034L125.274 40.4712V40.106C125.274 39.644 125.174 39.3039 124.973 39.0854C124.776 38.8634 124.459 38.7524 124.022 38.7524C123.532 38.7524 122.977 38.9028 122.357 39.2036L122.083 38.5215C122.374 38.3639 122.69 38.2404 123.034 38.1509C123.382 38.0614 123.729 38.0166 124.076 38.0166C124.778 38.0166 125.297 38.1724 125.634 38.4839C125.974 38.7954 126.144 39.2949 126.144 39.9824V44H125.483ZM123.469 43.3716C124.024 43.3716 124.459 43.2194 124.774 42.915C125.093 42.6107 125.252 42.1846 125.252 41.6367V41.105L124.361 41.1426C123.652 41.1676 123.14 41.2786 122.825 41.4756C122.513 41.6689 122.357 41.9715 122.357 42.3833C122.357 42.7056 122.454 42.9508 122.647 43.1191C122.844 43.2874 123.118 43.3716 123.469 43.3716ZM131.531 38.876H128.878V44H127.986V38.1133H131.531V38.876ZM136.322 44L136.145 43.1621H136.102C135.808 43.5309 135.515 43.7816 135.221 43.9141C134.931 44.043 134.568 44.1074 134.131 44.1074C133.547 44.1074 133.089 43.957 132.756 43.6562C132.426 43.3555 132.262 42.9276 132.262 42.3726C132.262 41.1838 133.212 40.5607 135.114 40.5034L136.113 40.4712V40.106C136.113 39.644 136.013 39.3039 135.812 39.0854C135.615 38.8634 135.298 38.7524 134.861 38.7524C134.371 38.7524 133.816 38.9028 133.196 39.2036L132.922 38.5215C133.212 38.3639 133.529 38.2404 133.873 38.1509C134.22 38.0614 134.568 38.0166 134.915 38.0166C135.617 38.0166 136.136 38.1724 136.473 38.4839C136.813 38.7954 136.983 39.2949 136.983 39.9824V44H136.322ZM134.308 43.3716C134.863 43.3716 135.298 43.2194 135.613 42.915C135.932 42.6107 136.091 42.1846 136.091 41.6367V41.105L135.2 41.1426C134.491 41.1676 133.979 41.2786 133.664 41.4756C133.352 41.6689 133.196 41.9715 133.196 42.3833C133.196 42.7056 133.293 42.9508 133.486 43.1191C133.683 43.2874 133.957 43.3716 134.308 43.3716ZM139.948 40.5571C141.061 40.5571 141.618 40.2492 141.618 39.6333C141.618 39.0532 141.167 38.7632 140.265 38.7632C139.989 38.7632 139.738 38.7882 139.513 38.8384C139.287 38.8885 138.992 38.9888 138.626 39.1392L138.31 38.4141C138.918 38.1419 139.583 38.0059 140.302 38.0059C140.979 38.0059 141.513 38.1455 141.903 38.4248C142.293 38.7005 142.488 39.0783 142.488 39.5581C142.488 40.217 142.121 40.6484 141.387 40.8525V40.8955C141.838 41.028 142.168 41.2178 142.375 41.4648C142.583 41.7083 142.687 42.0145 142.687 42.3833C142.687 42.9276 142.467 43.3519 142.026 43.6562C141.59 43.957 140.984 44.1074 140.211 44.1074C139.362 44.1074 138.707 43.9803 138.245 43.7261V42.9097C138.9 43.2176 139.563 43.3716 140.232 43.3716C140.748 43.3716 141.137 43.2839 141.398 43.1084C141.663 42.9294 141.795 42.6733 141.795 42.3403C141.795 41.6564 141.239 41.3145 140.125 41.3145H139.309V40.5571H139.948ZM144.98 38.1133V41.8462L144.943 42.8237L144.927 43.1299L148.112 38.1133H149.224V44H148.391V40.4014L148.407 39.6924L148.434 38.9941L145.254 44H144.143V38.1133H144.98ZM152.006 38.1133V40.5786H155.304V38.1133H156.195V44H155.304V41.3467H152.006V44H151.114V38.1133H152.006Z" fill="#3A3A3A"/>
                                </svg>
                            </a>
                        </Link>
                        <SearchInput />
                        <div className="search-card d-flex align-items-center ml-5">
                            {!authCheck&&<Button color={'blue'} onClick={()=>dispatch({type: SHOW_AUTH_MODAL, payload: true})}>
                                <Icon name='user md' /> Вход
                            </Button>}
                            {authCheck&&<Button color={'red'} onClick={()=>LOGOUT_USER_API()}>
                                <Icon name='user md' /> Выйти
                            </Button>}
                        </div>
                    </div>
                </Container>
            </div>
            <Container>
                <TopNav className={'mt-3'}>
                    <Link href={'/panel/'}>Каталог</Link>
                    <Link href={'/panel/products'}>Товары</Link>
                </TopNav>
            </Container>
        </>
    )
}

export default connect(null, null)(AdminTopPanel)