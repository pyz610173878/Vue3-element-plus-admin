//cookies
import { setToken, setUsername, getUsername, getToken, removeToken, removeUsername } from "@/utils/cookies";
import { Login, Logout } from "../../api/account";

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
    },
    SET_TOKEN(state, value) { // 设置 token
        if (typeof value !== 'string' || value.trim() === '') {
            throw new Error('Invalid token value');
        }
            state.token = value;
            value && setToken(value);
        },
        SET_USERNAME(state, value){ // 设置用户名
            state.username = value;
            value && setUsername(value);
        },

    }

const actions = {
        loginAction(context, repuestData) {
            return new Promise((resolve, reject) => {
                Login(repuestData).then((response) => {
                    let data = response.data;
                    context.commit('SET_TOKEN', data.token);
                    context.commit('SET_USERNAME', data.username);
                    resolve(response);
                    
                }).catch(error => {
                    reject(error);
                })
            })
        },
    }
export default {
        namespaced: true,
        state,
        getters,
        mutations,
        actions
    };