//cookies
import { setToken, setUsername, getUsername, getToken, removeToken, removeUsername } from "@/utils/cookies";
const state = {
    collapse: JSON.parse(sessionStorage.getItem('collapse')) || false,
    token: "" || getToken(),
    username: "" || getUsername(),
    table_action_request: false
};
// getters 对应着方法
const getters = {
    

    
}
const mutations = {
    SET_COLLAPSE(state) {
        state.collapse = !state.collapse;
        sessionStorage.setItem('collapse', JSON.stringify(state.collapse));
    }
}

const actions = {}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};