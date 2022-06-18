import { createStore } from "vuex";

export default createStore({
  state: {
    token: null,
    id: null,
    username: null,
  },
  mutations: {
    setUserToken: (state, token) => {
      state.token = token;
    },
    setUserInfo: (state, userInfo) => {
      state.id = userInfo.id;
      state.username = userInfo.username;
    },
    clearUserInfo: (state) => {
      state.id = null;
      state.username = null;
      state.token = null;
    },
  },
  actions: {},
  modules: {},
});
