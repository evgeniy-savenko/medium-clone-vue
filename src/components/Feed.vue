<template>
  <div>Feed {{ apiUrl }}</div>
</template>

<script>
import {actionsTypes} from '@/store/modules/feed';
export default {
  name: 'McvFeed',
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  mounted() {
    console.log('init');
    this.$store.dispatch(actionsTypes.getFeed, {apiUrl: this.apiUrl});
  },
};
</script>

<style></style>
