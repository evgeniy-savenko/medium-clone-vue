import feedApi from '@/api/feed';

export const mutationsTypes = {
  getFeedStart: '[feed] Get feed start',
  getFeedSuccess: '[feed] Get feed success',
  getFeedFailure: '[feed] Get feed failure',
};

export const actionsTypes = {
  getFeed: '[feed] Get feed',
};

export const feed = {
  state: () => ({
    data: null,
    isLoading: false,
    error: null,
  }),
  getters: {},
  mutations: {
    [mutationsTypes.getFeedStart](state) {
      state.isLoading = true;
      state.data = null;
    },
    [mutationsTypes.getFeedSuccess](state, payload) {
      state.isLoading = false;
      state.data = payload;
    },
    [mutationsTypes.getFeedFailure](state) {
      state.isLoading = false;
    },
  },
  actions: {
    [actionsTypes.getFeed](context, {apiUrl}) {
      return new Promise((resolve) => {
        context.commit(mutationsTypes.getFeedStart);
        feedApi
          .getFeed(apiUrl)
          .then((response) => {
            context.commit(mutationsTypes.getFeedSuccess, response.data);
            resolve(response.data);
          })
          .catch(() => {
            context.commit(mutationsTypes.getFeedFailure);
          });
      });
    },
  },
};
