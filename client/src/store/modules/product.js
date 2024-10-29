import { getAllProduct, getDetailProduct, searchProduct, sortProduct, sortProductPrice } from "@/api/product"


export const products={
    state:{
        products:[],
        productById:{}

    },
    mutations:{
        setProduct:(state,payload)=>{
            state.products=payload;
            console.log(payload);
            
        },
        setDetailProduct:(state,payload)=>{
            state.productById=payload;
            console.log(124,payload);
            
        },
        setSearch:(state,payload)=>{
            state.products=payload;
            console.log(34567,payload);
            
        },
        sortItem:(state,payload)=>{
            state.products = payload;
        },
        sortPriceItem:(state,payload)=>{
            state.products = payload;
        }
    },
    actions:{
        getProduct: async({commit})=>{
            const response=await getAllProduct();
            commit("setProduct",response)
        },
        getDetail:async({commit},id)=>{
            const response=await getDetailProduct(id);
            commit("setDetailProduct",response)
        },
        searchProduct:async({commit},name)=>{
            const response = await searchProduct(name);
            commit("setSearch",response)
        },
        sortProduct:async ({commit},name) => {
            const response=await sortProduct(name);
            commit("sortItem",response)
        },
        sortPrice:async ({commit},price) => {
            const response = await sortProductPrice(price);
            commit("sortPriceItem",response)
        }

    }
}