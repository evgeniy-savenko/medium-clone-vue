import articleApi from '@/api/article';

export const mutationTypes = {
  getArticleStart: '[article] Get article start',
  getArticleSuccess: '[article] Get article success',
  getArticleFailure: '[article] Get article failure',
};

export const actionTypes = {
  getArticle: '[article] Get article',
};

export const article = {
  state: () => ({
    data: null,
    isLoading: false,
    error: null,
  }),
  mutations: {
    [mutationTypes.getArticleStart](state) {
      state.isLoading = true;
      state.data = null;
    },
    [mutationTypes.getArticleSuccess](state, payload) {
      state.isLoading = false;
      state.data = payload;
    },
    [mutationTypes.getArticleFailure](state) {
      state.isLoading = false;
    },
  },
  actions: {
    [actionTypes.getArticle](context, {slug}) {
      return new Promise((resolve) => {
        context.commit(mutationTypes.getArticleStart);
        articleApi
          .getArticle(slug)
          .then((article) => {
            context.commit(mutationTypes.getArticleSuccess, article);
            resolve(article);
          })
          .catch(() => {
            context.commit(mutationTypes.getArticleFailure);
          });
      });
    },
  },
};
