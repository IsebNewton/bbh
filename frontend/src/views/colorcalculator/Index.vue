<template>
  <div class="container colorcalculator">
    <h1>Herzlich Willkommen bei der Farbberechnung von Schönes Haus</h1>
    <div class="central">
        <h3>Bitte wählen Sie Ihre gewünschte Option:</h3>
    </div>
    <div class="central">
        <router-link to="/paintwall"><b-button variant="primary">Ich möchte eine Wand streichen</b-button></router-link>
    </div>
    <div class="central">
        <router-link to="/paintrectroom"><b-button variant="primary">Ich möchte ein rechteckiges Zimmer streichen</b-button></router-link>
    </div>
    <div class="central">
        <router-link to="/paintnotrectroom"><b-button variant="primary">Ich möchte ein nicht rechteckiges Zimmer streichen</b-button></router-link>
    </div>
  </div>
</template>

<script>
require("./../../../public/assets/background.jpg");
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
    this.$parent.title = "Farbbedarfsrechner";
  },
  watch: {
  },
  methods: {
  }
}
</script>