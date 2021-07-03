<template>
  <div class="h-100 w-100 d-flex flex-column">
    <topbar :title="title" :loggedIn="loggedIn"></topbar>

    <div class="flex-fill overflow-auto d-flex">
      <sidebar-menu
        v-if="adminnavigation"
        :menu="menu"
        relative
        hideToggle
        width="200px"
      ></sidebar-menu>
      <router-view />
    </div>

    <footer class="bg-secondary p-3 d-flex justify-content-between">
      <div>
        <router-link class="me-3 text-body text-decoration-none" to="/">
          Home
        </router-link>
        <router-link class="me-3 text-body text-decoration-none" to="/privacy">
          Datenschutz
        </router-link>
        <router-link class="me-3 text-body text-decoration-none" to="/impress">
          Impressum
        </router-link>
      </div>
      <div>
        <router-link class="text-secondary text-decoration-none" to="/login">
          Login
        </router-link>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { SidebarMenu } from "vue-sidebar-menu";
import Topbar from "./views/components/Topbar.vue";

export default {
  data() {
    return {
      title: "",
      menu: [
        {
          header: true,
          title: "BBH Administration",
          hiddenOnCollapse: true,
        },
        {
          href: "/products",
          title: "Produktübersicht"
        },
        {
          href: "/calculationfactors",
          title: "Berechnungsfaktoren"
        },
      ],
      adminnavigation: false,
      loggedIn: false,
    };
  },
  components: {
    "sidebar-menu": SidebarMenu,
    topbar: Topbar,
  },
  computed: {
    ...mapState("auth", ["isAuthorized"]),
  },
  mounted() {},
  watch: {},
  methods: {
    ...mapActions("auth", ["getAuth"]),
    checkLoggedIn() {
      this.getAuth().then(
        function() {
          this.loggedIn = this.isAuthorized;
          if (!this.loggedIn) {
            this.$router.push({ name: "Login" });
          }
        }.bind(this)
      );
    },
  },
};
</script>
