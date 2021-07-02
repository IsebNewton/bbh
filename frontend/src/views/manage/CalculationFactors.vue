<template>
  <div class="container">
    <h1 class="text-shadow">Berechnungsfaktoren</h1>

    <b-form @submit="onSubmit" @reset="onReset">

      <div
        v-for="parameterGroup in parameterDict"
        :key="parameterGroup.key"
        class="row align-items-center mb-3">
        <div
          v-for="parameter in parameterGroup"
          :key="parameter.key"
          class="row align-items-center mb-3">
          <div class="col-4">
            <label class="text-shadow text-bold">{{parameter.label}}</label>
          </div>
          <div class="col-4">
            <b-form-input
              class="formfield"
              step="0.01"
              :id="'inputParameter' + parameter.id"
              v-model="parameters[parameter.id]"
              type="number"
              min=0
              oninput="validity.valid||(value='');"
              required
            ></b-form-input>
          </div>
        </div>
      </div>

      <b-button type="reset" variant="danger">Zurücksetzen</b-button>
      <b-button type="submit" variant="primary">Speichern</b-button>
    </b-form>

  </div>
</template>        

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: {
  },
  data() {
    return {
    };
  },
  components: {
  },
  computed: {
    ...mapState("parameter", ["availableParameters", "parameterDict", "parameters"])
  },
  mounted(){
    this.$parent.title = "";
    this.$parent.adminnavigation = true;
    this.$parent.checkLoggedIn();
    this.getParameters();
  },
  watch: {
  },
  methods: {
    ...mapActions("parameter", [
      "getParameters",
      "putParameter"
    ]),
    onSubmit(event) {
      event.preventDefault();
      this.saveFactors();
    },
    saveFactors() {
      for (var i = 0; i < this.availableParameters.length; i++) {
        if (this.parameters[this.availableParameters[i].id] !== this.availableParameters[i].value.toString()) {
          this.availableParameters[i].value = Number(this.parameters[this.availableParameters[i].id]);
        }
        this.putParameter(this.availableParameters);
      }
    },
    onReset(event) {
      event.preventDefault();
      this.getParameters();
    },
  }
}
</script>