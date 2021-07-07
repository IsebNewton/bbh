<template>
  <div class="bg-paint d-flex w-100">
    <div class="container my-auto">
      <h1 class="text-center text-shadow mb-5">
        Bitte geben Sie die Daten des Zimmers ein.
      </h1>

      <div class="row">
        <div class="col-7 offset-1">
          <b-form @submit="onSubmit" @reset="onReset">
            <div class="row align-items-center mb-3">
              <div class="col-4">
                <label class="text-shadow text-bold">Grundfläche (LxB):</label>
              </div>
              <div class="col-4">
                <b-form-input
                  class="formfield"
                  id="inputRoomLength"
                  v-model="formdata.roomLength"
                  type="number"
                  placeholder="Zimmerlänge (cm) eingeben"
                  step="any"
                  min="0"
                  required
                ></b-form-input>
              </div>
              <div class="col-4">
                <b-form-input
                  class="formfield"
                  id="inputRoomWidth"
                  v-model="formdata.roomWidth"
                  type="number"
                  placeholder="Zimmerbreite (cm) eingeben"
                  step="any"
                  min="0"
                  required
                ></b-form-input>
              </div>
            </div>

            <div class="row align-items-center mb-3">
              <div class="col-4">
                <label class="text-shadow text-bold">Deckenhöhe (cm):</label>
              </div>
              <div class="col-4">
                <b-form-input
                  class="formfield"
                  id="inputCeilingHeight"
                  v-model="formdata.ceilingHeight"
                  type="number"
                  placeholder="Deckenhöhe (cm) eingeben"
                  required
                ></b-form-input>
              </div>
            </div>

            <b-form @submit="addRecess">
              <div class="row align-items-center mb-3">
                <div class="col-4">
                  <label class="text-shadow text-bold">
                    Aussparungen (cmxcm):
                  </label>
                </div>
                <div class="col-3">
                  <b-form-input
                    class="formfield"
                    id="inputCeilingHeight"
                    v-model="resess.length"
                    type="number"
                    placeholder="Länge (cm) eingeben"
                    required
                  ></b-form-input>
                </div>
                <div class="col-3">
                  <b-form-input
                    class="formfield"
                    id="inputCeilingHeight"
                    v-model="resess.height"
                    type="number"
                    placeholder="Breite (cm) eingeben"
                    required
                  ></b-form-input>
                </div>
                <div class="col-2">
                  <b-button type="submit" variant="primary">
                    hinzufügen
                  </b-button>
                </div>
              </div>
            </b-form>

            <b-button variant="primary" @click="goBack">Zurück</b-button>
            <b-button type="submit" variant="primary">Weiter</b-button>
          </b-form>
        </div>
        <recess-list
          ref="refRecessList"
          :recesses="recesses"
          arrayname="recesses"
          class="col-4"
        >
        </recess-list>
      </div>
    </div>
  </div>
</template>

<script>
import RecessList from "../components/RecessList";

export default {
  data() {
    return {
      formdata: {
        wallLength: null,
        ceilingHeight: null,
      },
      resess: {
        length: null,
        height: null,
      },
      recesses: [],
    };
  },
  components: {
    "recess-list": RecessList,
  },
  computed: {},
  mounted() {
    this.$parent.title = "Farbbedarfsrechner";
    this.$parent.adminnavigation = false;
    this.loadData();
  },
  watch: {
    formdata: {
      handler: function(newVal, oldVal) {
        this.saveData("paintRectRoomData", newVal);
      },
      deep: true,
    },
    recesses: {
      handler: function(newVal, oldVal) {
        this.saveData("paintRectRoomRecesses", newVal);
      },
      deep: true,
    },
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.calculateArea();
      localStorage.setItem("lastView", "RechteckigesZimmerStreichen");
      this.$router.push({ name: "Parameterauswahl" });
    },
    onReset(event) {
      event.preventDefault();
    },
    goBack() {
      this.$router.push({ name: "Farbrechner" });
    },
    addRecess(event) {
      event.preventDefault();
      this.$refs.refRecessList.addRecess(
        "Aussparung",
        this.resess.length,
        this.resess.height
      );
      this.resess.length = null;
      this.resess.height = null;
    },
    calculateArea() {
      var area =
        (this.formdata.roomLength * 2 + this.formdata.roomWidth * 2) *
        this.formdata.ceilingHeight;
      for (var i = 0; i < this.$refs.refRecessList.recesses.length; i++) {
        area -=
          this.$refs.refRecessList.recesses[i].length *
          this.$refs.refRecessList.recesses[i].height;
      }
      area /= 10000; // cm² -> m²
      localStorage.setItem("area", area);
    },
    loadData() {
      var formdata = localStorage.getItem("paintRectRoomData");
      if (formdata) {
        this.formdata = JSON.parse(formdata);
      }
      var recesses = localStorage.getItem("paintRectRoomRecesses");
      if (recesses) {
        this.recesses = JSON.parse(recesses);
      }
    },
    saveData(name, data) {
      localStorage.setItem(name, JSON.stringify(data));
    },
  },
};
</script>
