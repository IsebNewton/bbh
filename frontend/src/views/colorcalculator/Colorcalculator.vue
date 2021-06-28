<template>
  <div class="container text-center">
    <h1 class="text-shadow">Herzlich Willkommen bei der Farbberechnung von Schönes Haus</h1>
    <h3 class="text-shadow mb-5">Bitte wählen Sie Ihre gewünschte Option:</h3>
    <div class="my-4">
        <router-link to="/paintwall"><b-button variant="primary">Ich möchte eine Wand streichen</b-button></router-link>
    </div>
    <div class="my-4">
        <router-link to="/paintrectroom"><b-button variant="primary">Ich möchte ein rechteckiges Zimmer streichen</b-button></router-link>
    </div>
    <div class="my-4">
        <router-link to="/paintnotrectroom"><b-button variant="primary">Ich möchte ein nicht rechteckiges Zimmer streichen</b-button></router-link>
    </div>
  </div>
</template>

<script>
require("./../../../public/assets/background.png");
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
    this.$parent.adminnavigation = false;
  },
  watch: {
  },
  methods: {
  }
}
</script>