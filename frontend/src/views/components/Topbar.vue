<template>
  <header class="d-flex align-items-center bg-primary">
    <router-link :to="links[0].path" exact>
      <b-img src="assets/logo.jpg" width="70px" alt="Schönes Haus"></b-img>
    </router-link>

    <h2 class="m-0 flex-fill text-center text-white text-shadow">
      {{ title }}
    </h2>

    <div v-if="loggedIn" class="p-2">
      <a class="btn btn-secondary text-body text-shadow" href="#/login">
        Administration
      </a>
      <b-button
        class="ms-2 text-body text-shadow"
        variant="secondary"
        @click="logout"
      >
        Abmelden
      </b-button>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from "vuex";
require("./../../../public/assets/logo.jpg");

export default {
  name: "Topbar",
  props: {
    title: String,
    loggedIn: Boolean,
  },
  data() {
    return {
      links: this.$router.options.routes,
    };
  },
  components: {},
  computed: {
    ...mapState("auth", ["isAuthorized"]),
  },
  mounted() {},
  watch: {},
  methods: {
    ...mapActions("auth", ["getAuth", "deleteAuth"]),
    logout() {
      this.deleteAuth().then(
        function() {
          this.$router.push({ name: "Login" });
        }.bind(this)
      );
    },
  },
};
</script>
