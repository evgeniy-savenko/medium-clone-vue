import articleApi from '@/api/article';

export const mutationsTypes = {
  createArticleStart: '[createArticle] Create article Start',
  createArticleSuccess: '[createArticle] Create article Success',
  createArticleFailure: '[createArticle] Create article Failure',
};

export const actionTypes = {
  createArticle: '[createArticle] Create article',
};

export const createArticle = {
  state: () => ({
    isSubmiting: false,
    validationErrors: null,
  }),
  mutations: {
    [mutationsTypes.createArticleStart](state) {
      state.isSubmiting = true;
    },
    [mutationsTypes.createArticleSuccess](state) {
      state.isSubmiting = false;
    },
    [mutationsTypes.createArticleFailure](state, payload) {
      state.isSubmiting = true;
      state.validationErrors = payload;
    },
  },
  actions: {
    [actionTypes.createArticle](context, {articleInput}) {
      return new Promise((resolve) => {
        context.commit(mutationsTypes.createArticleStart);
        articleApi
          .createArticle(articleInput)
          .then((article) => {
            context.commit(mutationsTypes.createArticleSuccess, article);
            resolve(article);
          })
          .catch((result) => {
            context.commit(
              mutationsTypes.createArticleFailure,
              result.response.data.errors
            );
          });
      });
    },
  },
};
