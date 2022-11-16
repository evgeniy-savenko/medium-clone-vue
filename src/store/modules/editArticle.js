import articleApi from '@/api/article';

export const mutationsTypes = {
  updateArticleStart: '[updateArticle] update article Start',
  updateArticleSuccess: '[updateArticle] update article Success',
  updateArticleFailure: '[updateArticle] update article Failure',
  getArticleStart: '[updateArticle] get article Start',
  getArticleSuccess: '[updateArticle] get article Success',
  getArticleFailure: '[updateArticle] get article Failure',
};

export const actionTypes = {
  updateArticle: '[updateArticle] update article',
  getArticle: '[updateArticle] get article',
};

export const editArticle = {
  state: () => ({
    isSubmiting: false,
    validationErrors: null,
    isLoading: false,
    article: null,
  }),
  mutations: {
    [mutationsTypes.updateArticleStart](state) {
      state.isSubmitting = true;
    },
    [mutationsTypes.updateArticleSuccess](state) {
      state.isSubmitting = false;
    },
    [mutationsTypes.updateArticleFailure](state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },
    [mutationsTypes.getArticleStart](state) {
      state.isLoading = true;
    },
    [mutationsTypes.getArticleSuccess](state, payload) {
      state.isLoading = false;
      state.article = payload;
    },
    [mutationsTypes.getArticleFailure](state) {
      state.isLoading = false;
    },
  },
  actions: {
    [actionTypes.updateArticle](context, {slug, articleInput}) {
      return new Promise((resolve) => {
        context.commit(mutationsTypes.updateArticleStart);
        articleApi
          .updateArticle(slug, articleInput)
          .then((article) => {
            context.commit(mutationsTypes.updateArticleSuccess, article);
            resolve(article);
          })
          .catch((result) => {
            context.commit(
              mutationsTypes.updateArticleFailure,
              result.response.data.errors
            );
          });
      });
    },
    [actionTypes.getArticle](context, {slug}) {
      return new Promise((resolve) => {
        context.commit(mutationsTypes.getArticleStart);
        articleApi
          .getArticle(slug)
          .then((article) => {
            context.commit(mutationsTypes.getArticleSuccess, article);
            resolve(article);
          })
          .catch(() => {
            context.commit(mutationsTypes.getArticleFailure);
          });
      });
    },
  },
};
