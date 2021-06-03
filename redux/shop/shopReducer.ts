import {CATALOG_LOADED, UPDATE_CATALOG, UPDATE_PRODUCTS, PRODUCTS_LOADED} from "@/redux/shop/shop.const";

interface StateProps {
    catalog: any[];
    products: any[];
    card: any[];
    productsLoaded: boolean;
    catalogLoaded: boolean;
}

const initState: StateProps = {
    catalog: [],
    products: [],
    productsLoaded: false,
    catalogLoaded: false,
    card: []
}

export const shopReducer = (state = initState, action: any) => {
    switch (action.type) {
        case UPDATE_CATALOG:
            return {
                ...state,
                catalog: action.payload ? state.catalog.concat(action.payload) : []
            }
        case CATALOG_LOADED:
            return {
                ...state,
                catalogLoaded: action.payload
            }
        case PRODUCTS_LOADED:
            return {
                ...state,
                productsLoaded: action.payload
            }
        case UPDATE_PRODUCTS:
            return {
                ...state,
                products: action.payload ? state.products.concat(action.payload) : []
            }
        case "ADD_TO_CARD":
            return {
                ...state,
                card: state.card.concat([action.payload])
            }
        case "REMOVE_FROM_CARD":
            return {
                ...state,
                card: state.card = [...state.card].filter((item)=>item.product.id !== action.payload)
            }
        case "UPDATE_CARD":
            return {
                ...state,
                card: state.card = [...action.payload]
            }

        case "UPDATE_COUNT_PRODUCT_IN_CARD":
            const item = state.card?.find((item)=>item.product.id === action.payload.id);
            item.count = action.payload.value;
            const newArray = [...state.card]
            return {
                ...state,
                card: [...newArray]
            }
    }
    return state;
};