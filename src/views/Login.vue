<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'register'}">
              Need an account?
            </router-link>
          </p>
          <mcv-validation-errors
            v-if="validationErrors"
            :validation-errors="validationErrors"
          ></mcv-validation-errors>
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="isSubmiting"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import McvValidationErrors from '@/components/ValidationErrors.vue';
import {actionTypes} from '@/store/modules/auth';

export default {
  name: 'McvRegister',
  components: {
    McvValidationErrors,
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    ...mapState({
      validationErrors: (state) => state.auth.validationErrors,
      isSubmiting: (state) => state.auth.isSubmiting,
    }),
    // isSubmiting() {
    //   return this.$store.state.auth.isSubmiting;
    // },
    // validationErrors() {
    //   return this.$store.state.auth.validationErrors;
    // },
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(actionTypes.login, {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({name: 'globalFeed'});
        });
    },
  },
};
</script>

<style></style>
