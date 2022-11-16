import userProfileApi from '@/api/userProfile';

export const mutationTypes = {
  getUserProfileStart: '[UserProfile] Get UserProfile start',
  getUserProfileSuccess: '[UserProfile] Get UserProfile success',
  getUserProfileFailure: '[UserProfile] Get UserProfile failure',
};

export const actionTypes = {
  getUserProfile: '[UserProfile] Get UserProfile',
};

export const userProfile = {
  state: () => ({
    data: null,
    isLoading: false,
    error: null,
  }),
  mutations: {
    [mutationTypes.getUserProfileStart](state) {
      state.isLoading = true;
      state.data = null;
    },
    [mutationTypes.getUserProfileSuccess](state, payload) {
      state.isLoading = false;
      state.data = payload;
    },
    [mutationTypes.getUserProfileFailure](state) {
      state.isLoading = false;
    },
  },
  actions: {
    [actionTypes.getUserProfile](context, {slug}) {
      return new Promise((resolve) => {
        context.commit(mutationTypes.getUserProfileStart);
        userProfileApi
          .getUserProfile(slug)
          .then((userProfile) => {
            context.commit(mutationTypes.getUserProfileSuccess, userProfile);
            resolve(userProfile);
          })
          .catch(() => {
            context.commit(mutationTypes.getUserProfileFailure);
          });
      });
    },
  },
};
