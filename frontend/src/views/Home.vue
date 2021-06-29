<template>
  <div class="container">
    <h1 class="mb-5 text-center">Herzlich Willkommen bei Schönes Haus!</h1>
    <div class="row align-items-stretch">
      <div class="col-5 text-center">
        <h2>Weiter zu Farbberechnung</h2>
        <div class="bg-secondary p-3">
          <p>
            Mit unserem innovativen Rechner bestimmen Sie die benötigte
            Farbmenge im Handumdrehen. So wissen Sie genau, wie viel Farbe
            benötigt wird und laufen nicht Gefahr, zu viel oder zu wenig zu
            kaufen.
          </p>
          <router-link to="/colorcalculator"
            ><b-button variant="primary">Zum Farbrechner</b-button></router-link
          >
        </div>
      </div>
      <div class="col-5 offset-2 text-center d-flex flex-column">
        <h2>Weiter zum Sortiment</h2>
        <div class="bg-secondary p-3 flex-grow-1 d-flex flex-column">
          <p class="flex-grow-1">
            Stöbern Sie in unserem breitem Farben-Sortiment, es ist Zeit für
            einen neuen Anstrich!
          </p>
          <div>
            <b-button
              variant="primary"
              href="https://www.obi.de/magazin"
              target="_blank"
              >Zum Shop</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  computed: {},
  mounted() {
    this.$parent.title = "";
    this.$parent.adminnavigation = false;
  },
  watch: {},
  methods: {},
};
</script>
