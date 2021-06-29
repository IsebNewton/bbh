<template>
  <div class="container">
    <h1 class="text-center text-shadow mb-5">
      Bitte geben Sie die Daten der Zimmerwände ein.
    </h1>

    <div class="row">
      <div class="col-7 offset-1">
        <b-form @submit="onSubmit" @reset="onReset">

          <b-form @submit="addWall">

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

            <div class="row align-items-center mb-3">
              <div class="col-4">
                <label class="text-shadow text-bold">Wandname:</label>
              </div>
              <div class="col-4">
                <b-form-input
                  class="formfield"
                  id="inputWallName"
                  v-model="wall.name"
                  type="text"
                  placeholder="z.B. Südwand"
                ></b-form-input>
              </div>
            </div>

            <div class="row align-items-center mb-3">
              <div class="col-4">
                <label class="text-shadow text-bold">Wandlänge (cm):</label>
              </div>
              <div class="col-4">
                <b-form-input
                  class="formfield"
                  id="inputWallLength"
                  v-model="wall.length"
                  type="number"
                  placeholder="Wandlänge (cm) eingeben"
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
      <div class="col-4">
        <recess-list title="Hinzugefügte Wände" ref="refWallList" :recesses="walls" arrayname="walls" class="mb-4"></recess-list>
        <recess-list title="Hinzugefügte Aussparungen" ref="refRecessList" :recesses="recesses" arrayname="recesses" class="mb-4"></recess-list>
      </div>
    </div>
  </div>
</template>

<script>
import SelectField from "../components/input/SelectField";
import RecessList from "../components/RecessList";

export default {
  data() {
    return {
      formdata: {
        wallLength: null,
        ceilingHeight: null
      },
      resess: {
        length: null,
        height: null,
      },
      wall: {
        name: null,
        length: null
      },
      recesses: [],
      walls: []
    };
  },
  components: {
    "select-field": SelectField,
    "recess-list": RecessList,
  },
  computed: {
  },
  mounted() {
    this.$parent.title = "Farbbedarfsrechner";
    this.$parent.adminnavigation = false;
    this.loadData();
  },
  watch: {
    formdata: {
      handler: function (newVal, oldVal) {
        this.saveData("paintNotRectRoomData", newVal);
      },
      deep: true
    },
    recesses: {
      handler: function (newVal, oldVal) {
        this.saveData("paintNotRectRoomRecesses", newVal);
      },
      deep: true
    },
    walls: {
      handler: function (newVal, oldVal) {
        this.saveData("paintNotRectRoomWalls", newVal);
      },
      deep: true
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.calculateArea();
      localStorage.setItem("lastView", "NichtRechteckigesZimmerStreichen");
      this.$router.push({ name: 'Parameterauswahl' });
    },
    onReset(event) {
      event.preventDefault();
    },
    goBack() {
      this.$router.push({ name: 'Farbrechner' });
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
    addWall(event) {
      event.preventDefault();
      this.$refs.refWallList.addRecess(
        this.wall.name,
        this.wall.length,
        this.formdata.ceilingHeight
      );
      this.wall.name = null;
      this.wall.length = null;
    },
    calculateArea() {
      var area = 0;
      for (var i = 0; i < this.walls.length; i++) {
        area += this.walls[i].length * this.formdata.ceilingHeight;
      }
      for (var i = 0; i < this.recesses.length; i++) {
        area -= this.recesses[i].length * this.recesses[i].height;
      }
      area /= 10000; // cm² -> m²
      localStorage.setItem("area", area);
    },
    loadData() {
      var formdata = localStorage.getItem("paintNotRectRoomData");
      if (formdata) {
        this.formdata = JSON.parse(formdata);
      }
      var recesses = localStorage.getItem("paintNotRectRoomRecesses");
      if (recesses) {
        this.recesses = JSON.parse(recesses);
      }
      var walls = localStorage.getItem("paintNotRectRoomWalls");
      if (walls) {
        this.walls = JSON.parse(walls);
      }
    },
    saveData(name, data) {
      localStorage.setItem(name, JSON.stringify(data));
    },
  },
};
</script>