<template>
  <div class="bg-paint d-flex w-100">
    <div class="container my-auto">
      <h1 class="text-center text-shadow mb-5">
        Bitte geben Sie die Daten der Wand ein.
      </h1>
      <h3 class="text-center text-shadow mb-5">Zu streichende Fläche: {{ area.toFixed(1) }} m²</h3>
      <h3 class="text-center text-shadow mb-5">
        Um den Farbbedarf genauer ermitteln zu können, geben Sie die folgenden
        Parameter an:
      </h3>

      <div class="row">
        <div class="col-7 offset-1">
          <b-form @submit="onSubmit" @reset="onReset">
            <div class="row align-items-center mb-3">
              <div class="col-4">
                <label class="text-shadow text-bold">Wandbeschaffenheit:</label>
              </div>
              <div class="col-4">
                <dropdown
                  id="inputWallTexture"
                  :items="parameterDict['Wandbeschaffenheit']"
                  :value="formdata.wallTexture"
                  @change="changedWallTexture"
                  useText="label"
                >
                </dropdown>
              </div>
              <div v-if="!isValidWallTexture" class="col-4">
                <label class="text-shadow text-bold"
                  >Bitte wählen Sie eine Wandbeschaffenheit aus!</label
                >
              </div>
            </div>

            <div class="row align-items-center mb-3">
              <div class="col-4">
                <label class="text-shadow text-bold"
                  >Welche Farbe ist aktuell aufgetragen?</label
                >
              </div>
              <div class="col-4">
                <dropdown
                  id="inputPrevcolor"
                  :items="availableColors"
                  :value="formdata.prevcolor"
                  @change="changedPrevcolor"
                  useText="color"
                >
                </dropdown>
              </div>
              <div v-if="!isValidPrevcolor" class="col-4">
                <label class="text-shadow text-bold"
                  >Bitte wählen Sie eine Farbe aus!</label
                >
              </div>
            </div>

            <div class="row align-items-center mb-3">
              <div class="col-4">
                <label class="text-shadow text-bold"
                  >Welche Farbe soll die Wand haben?</label
                >
              </div>
              <div class="col-4">
                <dropdown
                  id="inputColor"
                  :items="availableColors"
                  :value="formdata.color"
                  @change="changedColor"
                  useText="color"
                >
                </dropdown>
              </div>
              <div v-if="!isValidColor" class="col-4">
                <label class="text-shadow text-bold"
                  >Bitte wählen Sie eine Farbe aus!</label
                >
              </div>
            </div>

            <b-button variant="primary" @click="goBack">Zurück</b-button>
            <b-button type="submit" variant="primary">Weiter</b-button>
          </b-form>
        </div>
        <recess-list ref="refRecessList" class="col-4"></recess-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Dropdown from "../components/Dropdown";
import RecessList from "../components/RecessList";

export default {
  data() {
    return {
      formdata: {
        wallTexture: null,
        prevcolor: null,
        color: null,
      },
      area: 0,
      isValidWallTexture: true,
      isValidPrevcolor: true,
      isValidColor: true
    };
  },
  components: {
    dropdown: Dropdown,
    "recess-list": RecessList,
  },
  computed: {
    ...mapState("color", ["availableColors"]),
    ...mapState("parameter", ["availableParameters", "parameterDict"]),
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
      handler: function(newVal, oldVal) {
        this.saveData(newVal);
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions("color", ["getColors"]),
    ...mapActions("parameter", ["getParameters"]),
    onSubmit(event) {
      event.preventDefault();
      this.checkUserInput();
      if (this.isValidWallTexture && this.isValidPrevcolor && this.isValidColor) {
        this.$router.push({ name: "Resultlist" });
      }
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
    changedColor(color) {
      this.formdata.color = color;
    },
    changedPrevcolor(prevcolor) {
      this.formdata.prevcolor = prevcolor;
    },
    changedWallTexture(wallTexture) {
      this.formdata.wallTexture = wallTexture;
    },
    checkUserInput() {
      this.formdata.wallTexture ? this.isValidWallTexture = true : this.isValidWallTexture = false;
      this.formdata.prevcolor ? this.isValidPrevcolor = true : this.isValidPrevcolor = false;
      this.formdata.color ? this.isValidColor = true : this.isValidColor = false;
    }
  }
};
</script>
