<template>
  <div class="container">
    <h1>Geben Sie die Daten der Wand ein.</h1>
    <div class="leftform">
      <b-form @submit="onSubmit" @reset="onReset">
        <div class="formsection">
          <label class="formlabel">
              Wandläge (cm): 
          </label>
          <b-form-input class="formfield"
            id="inputWallLength"
            v-model="formdata.wallLength"
            type="number"
            placeholder="Wandlänge (cm) eingeben"
            required
          ></b-form-input>
        </div>
        <div class="formsection">
          <label class="formlabel">
              Deckenhöhe (cm): 
          </label>
          <b-form-input class="formfield"
            id="inputCeilingHeight"
            v-model="formdata.ceilingHeight"
            type="number"
            placeholder="Deckenhöhe (cm) eingeben"
            required
          ></b-form-input>
        </div>
        <b-form @submit="addRecess">
          <div class="formsection">
            <label class="formlabel">
                Aussparungen (cmxcm): 
            </label>
            <b-form-input class="formfield"
              id="inputCeilingHeight"
              v-model="resess.length"
              type="number"
              placeholder="Länge (cm) eingeben"
              required
            ></b-form-input>
            <b-button
              type="submit"
              class="formlabel">
              Aussparung hinzufügen
            </b-button>
            <b-form-input class="formfield"
              id="inputCeilingHeight"
              v-model="resess.height"
              type="number"
              placeholder="Breite (cm) eingeben"
              required
            ></b-form-input>
          </div>
        </b-form>
        <div 
          class="formsection"
          v-for="parameterGroup in getParameterGroup()"
          :key="parameterGroup">
          <label class="formlabel">
              {{parameterGroup}}
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
        <div class="content">
          <b-button type="submit" variant="primary">Weiter</b-button>
        </div>
      </b-form>
    </div>
    <recess-list ref="refRecessList"></recess-list>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SelectField from '../components/input/SelectField'
import RecessList from '../components/RecessList'

export default {
  data() {
    return {
        formdata: {
            wallLength: null,
            ceilingHeight: null,
            type: null
        },
        parameterDict: {},
        test: ["a", "b"],
        resess: {
          length: null,
          height: null
        }
    };
  },
  components: {
    "select-field": SelectField,
    "recess-list": RecessList
  },
  computed: {
    ...mapState("parameter", ["availableParameters"]),
  },
  mounted(){
    this.$parent.title = "Farbbedarfsrechner";
    this.getParameters();
  },
  watch: {
  },
  methods: {
    ...mapActions("parameter", ["getParameters", "deleteParameter", "searchParameter"]),
    onSubmit(event) {
      event.preventDefault();
    },
    onReset(event) {
      event.preventDefault();
    },
    getParameterGroup() {
      var result = [];
      for (var i = 0; i < this.availableParameters.length; i++)
      {
        if (result.indexOf(this.availableParameters[i].group) === -1)
        {
          result.push(this.availableParameters[i].group);
        }
      }
      return result;
    },
    getParameterByGroup(groupname) {
      var result = [];
      for (var i = 0; i < this.availableParameters.length; i++)
      {
        if (this.availableParameters[i].group == groupname)
        {
          result.push(this.availableParameters[i]);
        }
      }
      return result;
    },
    addRecess(event) {
      event.preventDefault();
      this.$refs.refRecessList.addRecess("Aussparung", this.resess.length, this.resess.height);
    }
  }
}
</script>