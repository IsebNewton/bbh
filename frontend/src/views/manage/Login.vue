<template>
  <div class="container text-center">
    <h1 class="text-shadow">Willkommen im internen Bereich der Anwendung!</h1>
    <h3 class="text-shadow mb-5">Bitte melden Sie sich an, um auf administrative Funktionalitäten zuzugreifen</h3>
    <div class="row">
      <div class="col-7 offset-1">
        <b-form @submit="onSubmit">
          <div class="row align-items-center mb-3">
            <div class="col-4">
              <label class="text-shadow text-bold">E-Mail:</label>
            </div>
            <div class="col-4">
              <b-form-input
                class="formfield"
                id="inputEmail"
                v-model="formdata.email"
                type="email"
                placeholder="E-Mail eingeben"
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

          <b-button type="submit" variant="primary">Login</b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>        

<script>
export default {
  props: {
  },
  data() {
    return {
      formdata: {
        email: null,
        password: null
      },
    };
  },
  components: {
  },
  computed: {
  },
  mounted(){
  },
  watch: {
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.$router.push({ name: 'Produkte' });
    },
  }
}
</script>