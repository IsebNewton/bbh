<template>
  <div class="container">
    <h1>Herzlich Willkommen bei Schönes Haus!</h1>
    <div class="content">
      <h2>Weiter zu Farbberechnung</h2>
      <div class="subcontent">
        <p>Mit unserem innovativen Rechner bestimmen Sie die benötigte Farbmenge im Handumdrehen. So wissen Sie genau, wie viel Farbe benötigt wird und laufen nicht Gefahr, zu viel oder zu wenig zu kaufen.</p>
        <router-link to="/colorcalculator"><b-button variant="primary">Zum Farbrechner</b-button></router-link>
      </div>
    </div>
    <div class="content">
      <h2>Weiter zum Sortiment</h2>
      <div class="subcontent">
        <p>Stöbern Sie in unserem breitem Farben-Sortiment, es ist Zeit für einen neuen Anstrich! </p>
        <b-button variant="primary">Zum Shop</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  components: {
  },
  computed: {
  },
  mounted(){
    this.$parent.title = "";
  },
  watch: {
  },
  methods: {
  }
}
</script>