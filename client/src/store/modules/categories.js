import { getCategory } from "@/api/categories";

export const categories = {
    state:{
        categoriesItem:[]
    },
    mutations:{
        getCategories: (state, payload) => {
            state.categoriesItem = payload;
            console.log(22222, payload);
          },
    },
    actions:{
        getCategory: async ({ commit }) => {
            const response = await getCategory();
            console.log(response);
      
            commit("getCategories", response);
          },
    }
}