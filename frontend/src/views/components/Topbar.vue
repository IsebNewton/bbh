<template>
  <header class="d-flex align-items-center bg-primary">
    <router-link :to="links[0].path" exact>
      <b-img src="assets/logo.jpg" width="70px" alt="Schönes Haus"></b-img>
    </router-link>
    <h2 class="mb-0 flex-grow-1 text-center text-white text-shadow">
      {{ title }}
    </h2>
    <a
      v-if="loggedIn"
      class="btn btn-primary"
      href="#/login">
      Administration
    </a>
    <b-button
      v-if="loggedIn"
      variant="primary"
      @click="logout">
      Abmelden
    </b-button>
  </header>
</template>

<script>
import { mapState, mapActions } from "vuex";
require("./../../../public/assets/logo.jpg");

export default {
  name: "Topbar",
  props: {
    title: String,
    loggedIn: Boolean
  },
  data() {
    return {
      links: this.$router.options.routes
    };
  },
  components: {
  },
  computed: {
    ...mapState("auth", ["isAuthorized"]),
  },
  mounted(){
  },
  watch: {
  },
  methods: {
    ...mapActions("auth", [
      "getAuth",
      "deleteAuth"
    ]),
    logout() {
      this.deleteAuth().then(
        function() {
          this.$router.push({ name: 'Login' });
        }.bind(this)
      );
    }
  }
};
</script>