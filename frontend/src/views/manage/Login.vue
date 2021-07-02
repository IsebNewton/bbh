<template>
  <div class="container my-auto">
    <h1 class="text-shadow text-center">Willkommen im internen Bereich der Anwendung!</h1>
    <h3 class="text-shadow text-center mb-5">
      Bitte melden Sie sich an, um auf administrative Funktionalitäten
      zuzugreifen
    </h3>
    <b-form @submit="onSubmit">
      <div class="row align-items-center">
        <div class="col-3 offset-2 text-end">
          <label class="text-shadow text-bold">Benutzername:</label>
        </div>
        <div class="col-3">
          <b-form-input
            class="formfield"
            id="inputName"
            v-model="formdata.name"
            type="text"
            placeholder="Benutzernamen eingeben"
            required
          ></b-form-input>
        </div>
      </div>

      <div class="row align-items-center my-3">
        <div class="col-3 offset-2 text-end">
          <label class="text-shadow text-bold">Passwort:</label>
        </div>
        <div class="col-3">
          <b-form-input
            class="formfield"
            id="inputPassword"
            v-model="formdata.password"
            type="password"
            placeholder="Passwort eingeben"
            required
          ></b-form-input>
        </div>
      </div>

      <p v-if="wrong" class="text-center">
        <small class="text-danger text-bold">
            Falschen Benutzername und / oder falsches Passwort eingeben!
        </small>
      </p>

      <div class="row">
        <div class="col-3 offset-5">
          <b-button type="submit" variant="primary">Login</b-button>
        </div>
        <div class="col-3"></div>
      </div>
    </b-form>
  </div>
</template>        

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: {},
  data() {
    return {
      formdata: {
        name: null,
        password: null,
      },
      wrong: false,
    };
  },
  components: {},
  computed: {
    ...mapState("auth", ["isAuthorized"]),
  },
  mounted() {
    this.$parent.title = "";
    this.$parent.adminnavigation = false;
    this.checkLoggedIn();
  },
  watch: {},
  methods: {
    ...mapActions("auth", ["getAuth", "postAuth"]),
    onSubmit(event) {
      event.preventDefault();
      this.checkAuth();
    },
    checkAuth() {
      this.postAuth(this.formdata).then(
        function () {
          if (this.isAuthorized) {
            this.$router.push({ name: "Produkte" });
          } else {
            this.wrong = true;
          }
        }.bind(this)
      );
    },
    checkLoggedIn() {
      this.getAuth().then(
        function () {
          if (this.isAuthorized) {
            this.$router.push({ name: "Produkte" });
          } else {
            this.$parent.loggedIn = false;
          }
        }.bind(this)
      );
    },
  },
};
</script>