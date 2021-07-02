<template>
  <div class="bg-paint d-flex w-100">
    <div class="container my-auto text-center">
      <h1 class="text-shadow">
        Herzlich Willkommen bei der Farbberechnung von Schönes Haus
      </h1>

      <h3 class="text-shadow mb-5">Bitte wählen Sie Ihre gewünschte Option:</h3>

      <div>
        <router-link class="btn btn-primary" to="/paintwall">
          Ich möchte eine Wand streichen
        </router-link>
      </div>

      <div class="my-4">
        <router-link class="btn btn-primary" to="/paintrectroom">
          Ich möchte ein rechteckiges Zimmer streichen
        </router-link>
      </div>

      <div>
        <router-link class="btn btn-primary" to="/paintnotrectroom">
          Ich möchte ein nicht rechteckiges Zimmer streichen
        </router-link>
      </div>

      <div class="mt-5 text-start">
        <router-link class="btn btn-primary" to="/">
          zurück
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
require("./../../../public/assets/background.png");
export default {
  data() {
    return {};
  },
  components: {},
  computed: {},
  mounted() {
    this.$parent.title = "Farbbedarfsrechner";
    this.$parent.adminnavigation = false;
  },
  watch: {},
  methods: {},
};
</script>
