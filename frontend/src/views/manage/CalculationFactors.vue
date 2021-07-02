<template>
  <div class="container">
    <h1 class="text-shadow mb-4">Berechnungsfaktoren</h1>
    <b-form @submit="onSubmit" @reset="onReset" @change="onChange">
      <div
        v-for="parameterGroup in parameterDict"
        :key="parameterGroup.key"
        class="mb-5"
      >
        <h2 class="fs-4 text-shadow mb-4">{{ parameterGroup[0].group }}</h2>
        <div
          v-for="parameter in parameterGroup"
          :key="parameter.key"
          class="row align-items-center mb-3 pe-0"
        >
          <div class="col-2">
            <label class="text-shadow text-bold">{{ parameter.label }}</label>
          </div>
          <div class="col-2">
            <b-form-input
              step="0.01"
              :id="'inputParameter' + parameter.id"
              v-model="parameters[parameter.id]"
              type="number"
              min="0"
              oninput="validity.valid||(value='');"
              required
            ></b-form-input>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <span class="badge bg-success" v-if="showSaveStatus">
            Gespeichert
          </span>
        </div>
        <div class="col-3 text-end">
          <b-button type="reset" variant="danger">Zurücksetzen</b-button>
          <b-button type="submit" variant="primary">Speichern</b-button>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: {},
  data() {
    return {
      showSaveStatus: false,
    };
  },
  components: {},
  computed: {
    ...mapState("parameter", [
      "availableParameters",
      "parameterDict",
      "parameters",
    ]),
  },
  mounted() {
    this.$parent.title = "";
    this.$parent.adminnavigation = true;
    this.$parent.checkLoggedIn();
    this.getParameters();
  },
  watch: {},
  methods: {
    ...mapActions("parameter", ["getParameters", "putParameter"]),
    onSubmit(event) {
      event.preventDefault();
      this.saveFactors();
    },
    onChange(event) {
      this.showSaveStatus = false;
    },
    saveFactors() {
      for (var i = 0; i < this.availableParameters.length; i++) {
        if (
          this.parameters[this.availableParameters[i].id] !==
          this.availableParameters[i].value.toString()
        ) {
          this.availableParameters[i].value = Number(
            this.parameters[this.availableParameters[i].id]
          );
        }
        this.putParameter(this.availableParameters);
      }
      this.showSaveStatus = true;
    },
    onReset(event) {
      event.preventDefault();
      this.showSaveStatus = false;
      this.getParameters();
    },
  },
};
</script>
