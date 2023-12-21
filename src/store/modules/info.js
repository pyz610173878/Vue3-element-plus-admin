// api
import { GetCategory } from "../../api/info";;
const state = {};
const getters = {}
const mutations = {}
const actions = {
    categoryAction() {
        console.log(123);
        return new Promise((resolve, reject) => {
            GetCategory().then(response => {
                resolve(response.data)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
