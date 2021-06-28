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
                  placeholder="Wandnamen eingeben"
                  required
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

          <!-- TODO: Hier müssen wir nochmal drüber reden !!! -->
          <div
            class="row align-items-center mb-3"
            v-for="parameterGroup in getParameterGroup()"
            :key="parameterGroup"
          >
            <div class="col-4">
              <label class="text-shadow text-bold">{{ parameterGroup }}</label>
            </div>
            <div class="col-4">
              <select-field
                class="formfield"
                inputId="selectPaintType"
                isRequired
                :options="getParameterByGroup(parameterGroup)"
                :value="formdata.parameters[parameterGroup]"
                :name="parameterGroup"
                @change="onChangePaintType"
              ></select-field>
            </div>
          </div>
          <!-- Ende: Hier müssen wir nochmal drüber reden !!! -->

          <div class="row align-items-center mb-3">
            <div class="col-4">
              <label class="text-shadow text-bold">Farbe</label>
            </div>
            <div class="col-4">
              <select-field
                class="formfield"
                inputId="selectColor"
                isRequired
                :options="availableColors"
                :value="formdata.color"
                useText="color"
                useValue="self"
                @change="onChangeColor"
              ></select-field>
            </div>
          </div>

          <b-button variant="primary" @click="goBack">Zurück</b-button>
          <b-button type="submit" variant="primary">Weiter</b-button>
        </b-form>
      </div>
      <div class="col-4">
        <recess-list title="Hinzugefügte Wände" ref="refWallList" class="mb-4"></recess-list>
        <recess-list title="Hinzugefügte Aussparungen" ref="refRecessList" class="mb-4"></recess-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import SelectField from "../components/input/SelectField";
import RecessList from "../components/RecessList";

export default {
  data() {
    return {
      parameternames: [],
      formdata: {
        ceilingHeight: null,
        color: null,
        parameters: []
      },
      wall: {
        name: null,
        length: null
      },
      resess: {
        length: null,
        height: null,
      }
    };
  },
  components: {
    "select-field": SelectField,
    "recess-list": RecessList,
  },
  computed: {
    ...mapState("color", ["availableColors"]),
    ...mapState("parameter", ["availableParameters"])
  },
  mounted() {
    this.$parent.title = "Farbbedarfsrechner";
    this.$parent.adminnavigation = false;
    this.getParameters();
    this.getColors();
  },
  watch: {},
  methods: {
    ...mapActions("color", [
      "getColors"
    ]),
    ...mapActions("parameter", [
      "getParameters"
    ]),
    ...mapMutations("colorcalculator", [
      "setArea",
      "setColor"
    ]),
    onSubmit(event) {
      event.preventDefault();
      this.calculateArea();
      this.setColor(this.formdata.color);
      this.$router.push({ name: 'Resultlist' });
    },
    onReset(event) {
      event.preventDefault();
    },
    goBack() {
      this.$router.push({ name: 'Farbrechner' });
    },
    getParameterGroup() {
      var result = [];
      for (var i = 0; i < this.availableParameters.length; i++) {
        if (result.indexOf(this.availableParameters[i].group) === -1) {
          result.push(this.availableParameters[i].group);
        }
      }
      this.parameternames = result;
      return result;
    },
    getParameterByGroup(groupname) {
      var result = [];
      for (var i = 0; i < this.availableParameters.length; i++) {
        if (this.availableParameters[i].group == groupname) {
          result.push(this.availableParameters[i]);
        }
      }
      return result;
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
      for (var i = 0; i < this.$refs.refWallList.recesses.length; i++) {
        area += this.$refs.refWallList.recesses[i].length * this.formdata.ceilingHeight;
      }
      for (var i = 0; i < this.$refs.refRecessList.recesses.length; i++) {
        area -= this.$refs.refRecessList.recesses[i].length * this.$refs.refRecessList.recesses[i].height;
      }
      area /= 10000; // cm² -> m²
      for (var i = 0; i < this.parameternames.length; i++) {
        area *= this.formdata.parameters[this.parameternames[i]];
      }
      this.setArea(area);
    },
    onChangePaintType(value, groupname) {
      this.formdata.parameters[groupname] = value;
    },
    onChangeColor(value) {
      this.formdata.color = value;
    }
  },
};
</script>