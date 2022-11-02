<template>
  <div>
    <mcv-topbar></mcv-topbar>
  </div>
  <router-view></router-view>
</template>

<script>
import McvTopbar from '@/components/Topbar.vue';

export default {
  name: 'McvApp',
  components: {
    McvTopbar,
  },
};
</script>

<style></style>
