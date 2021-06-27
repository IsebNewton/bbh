<template>
  <div class="container">
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
      <recess-list ref="refRecessList" class="col-4"></recess-list>
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
        roomLength: null,
        roomWidth: null,
        ceilingHeight: null,
        color: null,
        parameters: []
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
    calculateArea() {
      var area = (this.formdata.roomLength * 2 + this.formdata.roomWidth * 2) * this.formdata.ceilingHeight;
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