<template>
  <button
    @click="handleLike"
    :class="{
      btn: true,
      'btn-sm': true,
      'btn-primary': isFavoritedOptimistic,
      'btn-outline-primary': !isFavoritedOptimistic,
    }"
  >
    <i class="ion-heart">
      <span>&nbsp; {{ favoritedCountOptimistic }}</span>
    </i>
  </button>
</template>

<script>
import {actionTypes} from '@/store/modules/addToFavorites';
export default {
  name: 'McvAddToFavorites',
  props: {
    isFavorited: {
      type: Boolean,
      required: true,
    },
    articleSlug: {
      type: String,
      required: true,
    },
    favoritesCount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isFavoritedOptimistic: this.isFavorited,
      favoritedCountOptimistic: this.favoritesCount,
    };
  },

  methods: {
    handleLike() {
      this.$store.dispatch(actionTypes.addToFavorites, {
        slug: this.articleSlug,
        isFavorited: this.favoritedCountOptimistic,
      });
      if (this.isFavoritedOptimistic) {
        this.favoritedCountOptimistic -= 1;
      } else {
        this.favoritedCountOptimistic += 1;
      }
      this.isFavoritedOptimistic = !this.isFavoritedOptimistic;
    },
  },
};
</script>

<style></style>
