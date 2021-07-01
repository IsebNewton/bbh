<template>
  <div class="container">
    <h1 class="text-center text-shadow mb-5">
      Bitte geben Sie die Daten der Wand ein.
    </h1>
    <h3 class="text-shadow mb-5">
        Zu streichende Fläche: {{area}} m²
    </h3>
    <h3 class="text-shadow mb-5">
        Um den Farbbedarf genauer ermitteln zu können, geben Sie die folgenden Parameter an:
    </h3>

    <div class="row">
      <div class="col-7 offset-1">
        <b-form @submit="onSubmit" @reset="onReset">

          <div class="row align-items-center mb-3">
            <div class="col-4">
              <label class="text-shadow text-bold">Wandbeschaffenheit:</label>
            </div>
            <div class="col-4">
              <select
                class="formfield"
                id="inputWallTexture"
                v-model="formdata.wallTexture">
                <option
                    v-for="option in parameterDict['Wandbeschaffenheit']"
                    :key="option.id"
                    v-bind:value="option"
                >{{option.label}}</option>
              </select>
            </div>
          </div>

          <div class="row align-items-center mb-3">
            <div class="col-4">
              <label class="text-shadow text-bold">Welche Farbe ist aktuell aufgetragen?</label>
            </div>
            <div class="col-4">
              <select
                class="formfield"
                id="inputColor"
                v-model="formdata.prevcolor">
                <option
                    v-for="option in availableColors"
                    :key="option.id"
                    v-bind:value="option"
                >{{option.color}}</option>
              </select>
            </div>
          </div>

          <div class="row align-items-center mb-3">
            <div class="col-4">
              <label class="text-shadow text-bold">Welche Farbe soll die Wand haben?</label>
            </div>
            <div class="col-4">
              <select
                class="formfield"
                id="inputColor"
                v-model="formdata.color">
                <option
                    v-for="option in availableColors"
                    :key="option.id"
                    v-bind:value="option"
                >{{option.color}}</option>
              </select>
            </div>
          </div>

          <b-button variant="primary" @click="goBack">Zurück</b-button>
          <b-button type="submit" variant="primary">Weiter</b-button>
        </b-form>
      </div>
      <recess-list ref="refRecessList" class="col-4"></recess-list>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import RecessList from "../components/RecessList";

export default {
  data() {
    return {
      formdata: {
        wallTexture: null,
        prevcolor: null,
        color: null
      },
      area: 0
    };
  },
  components: {
    "recess-list": RecessList,
  },
  computed: {
    ...mapState("color", ["availableColors"]),
    ...mapState("parameter", ["availableParameters", "parameterDict"])
  },
  mounted() {
    this.$parent.title = "Farbbedarfsrechner";
    this.$parent.adminnavigation = false;
    this.getParameters();
    this.getColors();
    this.loadData();
  },
  watch: {
    formdata: {
      handler: function (newVal, oldVal) {
        this.saveData(newVal);
      },
      deep: true
    },
  },
  methods: {
    ...mapActions("color", [
      "getColors"
    ]),
    ...mapActions("parameter", [
      "getParameters"
    ]),
    onSubmit(event) {
      event.preventDefault();
      this.$router.push({ name: 'Resultlist' });
    },
    onReset(event) {
      event.preventDefault();
    },
    goBack() {
      var lastView = localStorage.getItem("lastView");
      if (lastView) {
        this.$router.push({ name: lastView });
      }
    },
    loadData() {
      var formdata = localStorage.getItem("selectedParams");
      if (formdata) {
        this.formdata = JSON.parse(formdata);
      }
      var area = localStorage.getItem("area");
      if (area) {
        this.area = JSON.parse(area);
      }
    },
    saveData(data) {
      localStorage.setItem("selectedParams", JSON.stringify(data));
    },
  },
};
</script>