<template>
  <div class="container">
    <h1 class="text-center text-shadow mb-5">
      Geben Sie die Daten der Wand ein.
    </h1>

    <div class="row">
      <div class="col-7 offset-1">
        <b-form @submit="onSubmit" @reset="onReset">
          <div class="row align-items-center mb-3">
            <div class="col-4">
              <label class="text-shadow text-bold">Wandläge (cm):</label>
            </div>
            <div class="col-4">
              <b-form-input
                class="formfield"
                id="inputWallLength"
                v-model="formdata.wallLength"
                type="number"
                placeholder="Wandlänge (cm) eingeben"
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
            <div class="row align-items-center">
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
            class="formsection"
            v-for="parameterGroup in getParameterGroup()"
            :key="parameterGroup"
          >
            <label class="formlabel">
              {{ parameterGroup }}
            </label>
            <select-field
              class="formfield"
              inputId="selectPaintType"
              ref="selectPaintType"
              isRequired
              :options="getParameterByGroup(parameterGroup)"
              :value="formdata.type"
            ></select-field>
          </div>
          <!-- Ende: Hier müssen wir nochmal drüber reden !!! -->

          <b-button type="submit" variant="primary">Weiter</b-button>
        </b-form>
      </div>
      <recess-list ref="refRecessList" class="col-4"></recess-list>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SelectField from "../components/input/SelectField";
import RecessList from "../components/RecessList";

export default {
  data() {
    return {
      formdata: {
        wallLength: null,
        ceilingHeight: null,
        type: null,
      },
      parameterDict: {},
      test: ["a", "b"],
      resess: {
        length: null,
        height: null,
      },
    };
  },
  components: {
    "select-field": SelectField,
    "recess-list": RecessList,
  },
  computed: {
    ...mapState("parameter", ["availableParameters"]),
  },
  mounted() {
    this.$parent.title = "Farbbedarfsrechner";
    this.getParameters();
  },
  watch: {},
  methods: {
    ...mapActions("parameter", [
      "getParameters",
      "deleteParameter",
      "searchParameter",
    ]),
    onSubmit(event) {
      event.preventDefault();
    },
    onReset(event) {
      event.preventDefault();
    },
    getParameterGroup() {
      var result = [];
      for (var i = 0; i < this.availableParameters.length; i++) {
        if (result.indexOf(this.availableParameters[i].group) === -1) {
          result.push(this.availableParameters[i].group);
        }
      }
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
    },
  },
};
</script>