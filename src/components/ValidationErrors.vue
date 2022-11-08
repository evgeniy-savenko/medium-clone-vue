<template>
  <ul
    class="error-messages"
    v-for="errorMessage in errorMessages"
    :key="errorMessage"
  >
    <li>
      {{ errorMessage }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'McvValidationErrors',
  props: {
    validationErrors: {
      type: Object,
      require: true,
    },
  },
  computed: {
    errorMessages() {
      return Object.keys(this.validationErrors).map((name) => {
        const message = this.validationErrors[name].join('');
        return `${name} ${message}`;
      });
    },
  },
};
</script>

<style></style>
