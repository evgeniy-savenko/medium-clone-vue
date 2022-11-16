import addToFavoritesApi from '@/api/addToFavorites';

export const mutationTypes = {
  addToFavoritesStart: '[addToFavoritesStart] add To Favorites Start',
  addToFavoritesSuccess: '[addToFavoritesSuccess] add To Favorites Success',
  addToFavoritesFailure: '[addToFavoritesFailure] add To Favorites Failure',
};

export const actionTypes = {
  addToFavorites: '[addToFavorites] add To Favorites',
};

export const addToFavorites = {
  state: () => ({}),
  mutations: {
    [mutationTypes.addToFavoritesStart]() {},
    [mutationTypes.addToFavoritesSuccess]() {},
    [mutationTypes.addToFavoritesFailure]() {},
  },
  getters: {},
  actions: {
    [actionTypes.addToFavorites](context, {slug, isFavorited}) {
      return new Promise((resolve) => {
        context.commit(mutationTypes.addToFavoritesStart);
        const promise = isFavorited
          ? addToFavoritesApi.removeFromFavorites(slug)
          : addToFavoritesApi.addToFavorites(slug);
        promise
          .then((article) => {
            context.commit(mutationTypes.addToFavoritesSuccess, article);
            resolve(article);
          })
          .catch(() => {
            context.commit(mutationTypes.addToFavoritesFailure());
          });
      });
    },
  },
};
