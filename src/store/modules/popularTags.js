import popularTagsApi from '@/api/popularTags';

export const mutationTypes = {
  getPopularTagsStart: '[popularTags] Get popularTags start',
  getPopularTagsSuccess: '[popularTags] Get popularTags success',
  getPopularTagsFailure: '[popularTags] Get popularTags failure',
};

export const actionTypes = {
  getPopularTags: '[popularTags] Get popularTags',
};

export const popularTags = {
  state: () => ({
    data: null,
    isLoading: false,
    error: null,
  }),
  mutations: {
    [mutationTypes.getPopularTagsStart](state) {
      state.isLoading = true;
      state.data = null;
    },
    [mutationTypes.getPopularTagsSuccess](state, tags) {
      state.isLoading = false;
      state.data = tags;
    },
    [mutationTypes.getPopularTagsFailure](state) {
      state.isLoading = false;
    },
  },
  actions: {
    [actionTypes.getPopularTags](context) {
      return new Promise((resolve) => {
        context.commit(mutationTypes.getPopularTagsStart);
        popularTagsApi
          .getPopularTags()
          .then((tags) => {
            context.commit(mutationTypes.getPopularTagsSuccess, tags);
            resolve(tags);
          })
          .catch(() => {
            context.commit(mutationTypes.getPopularTagsFailure);
          });
      });
    },
  },
};
