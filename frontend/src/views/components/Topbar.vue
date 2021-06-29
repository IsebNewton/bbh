<template>
  <header class="d-flex align-items-center bg-primary">
    <router-link :to="links[0].path" exact>
      <b-img src="assets/logo.jpg" width="70px" alt="Schönes Haus"></b-img>
    </router-link>
    <h2 class="mb-0 flex-grow-1 text-center text-white text-shadow">
      {{ title }}
    </h2>
  </header>
</template>

<script>
require("./../../../public/assets/logo.jpg");

export default {
  name: "Topbar",
  props: {
    title: String,
  },
  data() {
    return {
      links: this.$router.options.routes,
    };
  },
};
</script>