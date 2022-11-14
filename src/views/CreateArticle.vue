<template>
  <div>
    CreateArticle
    <mcv-article-form
      :initial-values="initialValues"
      :error="validationErrors"
      :is-submiting="isSubmiting"
      @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
import McvArticleForm from '@/components/ArticleForm.vue';
import {mapState} from 'vuex';
import {actionTypes} from '@/store/modules/createArticle';

export default {
  name: 'McvCreateArticle',
  components: {
    McvArticleForm,
  },
  data() {
    return {
      initialValues: {
        title: '',
        description: '',
        body: '',
        tagList: [],
      },
    };
  },
  methods: {
    onSubmit(articleInput) {
      console.log('123', articleInput);
      this.$store
        .dispatch(actionTypes.createArticle, {articleInput})
        .then((article) => {
          this.$router.push({name: 'article', params: {slug: article.slug}});
        });
    },
  },
  computed: {
    ...mapState({
      isSubmiting: (state) => state.createArticle.isSubmiting,
      validationErrors: (state) => state.createArticle.validationErrors,
    }),
  },
};
</script>

<style></style>
