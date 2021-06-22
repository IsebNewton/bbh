<template>
  <div class="container">
    <h1>Geben Sie die Daten der Wand ein.</h1>
    <div class="content">
      <b-form @submit="onSubmit" @reset="onReset">
          <div class="formsection">
            <label class="formfield">
               Wandläge: 
            </label>
            <b-form-input class="formfield"
              id="inputWallLength"
              v-model="formdata.wallLength"
              type="number"
              placeholder="Wandlänge eingeben"
              required
            ></b-form-input>
          </div>
          <div class="formsection">
            <label class="formfield">
               Deckenhöhe: 
            </label>
            <b-form-input class="formfield"
              id="inputCeilingHeight"
              v-model="formdata.ceilingHeight"
              type="number"
              placeholder="Deckenhöhe eingeben"
              required
            ></b-form-input>
          </div>
          <div class="formsection">
            <label class="formfield">
               Maltyp: 
            </label>
            <select-field
                class="formfield"
                inputId="selectPaintType"
                ref="selectPaintType"
                isRequired
                :options="this.types"
                :value="formdata.type"
            ></select-field>
          </div>
          <b-button class="float-right" type="submit" variant="primary">Weiter</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import SelectField from '../components/input/SelectField'

export default {
  data() {
    return {
        formdata: {
            wallLength: null,
            ceilingHeight: null,
            type: null
        },
        types: [],
    };
  },
  components: {
    "select-field": SelectField
  },
  computed: {
  },
  mounted(){
    this.$parent.title = "Farbbedarfsrechner";
  },
  watch: {
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
    },
    onReset(event) {
      event.preventDefault();
    },
  }
}
</script>