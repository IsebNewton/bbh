<template>
  <div class="container text-center">
    <h1 class="text-shadow">Willkommen im internen Bereich der Anwendung!</h1>
    <h3 class="text-shadow mb-5">Bitte melden Sie sich an, um auf administrative Funktionalitäten zuzugreifen</h3>
    <div class="row">
      <div class="col-7 offset-1">
        <b-form @submit="onSubmit">
          <div class="row align-items-center mb-3">
            <div class="col-4">
              <label class="text-shadow text-bold">Benutzername:</label>
            </div>
            <div class="col-4">
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

          <div class="row align-items-center mb-3">
            <div class="col-4">
              <label class="text-shadow text-bold">Passwort:</label>
            </div>
            <div class="col-4">
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

          <small v-if="wrong">Falschen Benutzername und / oder falsches Passwort eingeben!</small>

          <b-button type="submit" variant="primary">Login</b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>        

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: {
  },
  data() {
    return {
      formdata: {
        name: null,
        password: null
      },
      wrong: false
    };
  },
  components: {
  },
  computed: {
    ...mapState("auth", ["isAuthorized"]),
  },
  mounted(){
    this.$parent.title = "";
    this.$parent.adminnavigation = false;
    this.checkLoggedIn();
  },
  watch: {
  },
  methods: {
    ...mapActions("auth", [
      "getAuth",
      "postAuth"
    ]),
    onSubmit(event) {
      event.preventDefault();
      this.checkAuth();
    },
    checkAuth() {
      this.postAuth(this.formdata).then(
        function() {
          if (this.isAuthorized) {
            this.$router.push({ name: 'Produkte' });
          }
          else {
            this.wrong = true;
          }
        }.bind(this)
      );
    },
    checkLoggedIn() {
      this.getAuth().then(
        function() {
          if (this.isAuthorized) {
            this.$router.push({ name: 'Produkte' });
          }
          else {
            this.$parent.loggedIn = false;
          }
        }.bind(this)
      );
    }
  }
}
</script>