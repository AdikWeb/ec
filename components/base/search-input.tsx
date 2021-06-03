import {useCallback, useEffect, useRef, useState} from "react";
import {getProductsAll} from "@/api/shop/products.api";
import {Search} from "semantic-ui-react";

const SearchInput = ()=>{
    const [searchResultStatic, setSearchResultStatic] = useState<any[]>([]);
    const [searchResult, setSearchResult] = useState<any[]>([]);
    const [searchInputValue, setSearchInputValue] = useState<string>('');
    const [searchState, setSearchState] = useState<boolean>(false);
    const resultRenderer = ({title, image, price}:any) => {
        return (
            <>
                <div className="search-result d-flex align-items-stretch">
                    <div className="search-result__image mr-3">
                        <img src={image} alt=""/>
                    </div>
                    <div className="search-result__info">
                        <h4>{title}</h4>
                        <span className={'price'}>
                            {price}kzt
                        </span>
                    </div>
                </div>
            </>
        );
    }

    const timeout: any = useRef();
    const handleSearchChange = useCallback((e, data) => {
        clearTimeout(timeout.current);
        setSearchState(true);
        if(data.value.length === 0) setSearchResult([])
        let regx = new RegExp(data.value, 'ugi');
        timeout.current = setTimeout(() => {
            if(data.value.length !== 0){
                getProductsAll().then(r => {
                    setSearchResultStatic(r)
                    let res = r.filter((item:any)=>item.title.match(regx));
                    setSearchResult(res);
                    setSearchState(false);
                });
            }else {
                setSearchState(false);
            }
        }, 500);
        setSearchInputValue(data.value);
    }, []);

    useEffect(() => {
        return () => {
            clearTimeout(timeout.current);
        };
    }, []);

    return (
        <>
            <Search
                size={'small'}
                className={'ml-a'}
                onResultSelect={(e, data) =>{}
                    // dispatch({type: 'UPDATE_SELECTION', selection: data.result.title})
                }
                onSearchChange={handleSearchChange}
                loading={searchState}
                resultRenderer={resultRenderer}
                results={searchResult}
                value={searchInputValue}
            />
        </>
    )
}

export default SearchInput;