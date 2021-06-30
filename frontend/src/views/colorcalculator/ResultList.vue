<template>
  <div class="container">
    <h1 class="text-center text-shadow">
      Auf Grundlage Ihrer Angaben empfehlen wir Ihnen die folgenden Produkte:
    </h1>
    <h3 class="text-shadow mb-5">
      Sie haben folgende Fläche zu streichen: {{area}} m²
    </h3>

    <div class="row align-items-center mb-3">
      <div class="col-4">
        <label class="text-shadow text-bold">Sie haben folgende Farbe gewählt: </label>
      </div>
      <div class="col-4">
        <select
          class="formfield"
          id="inputColor"
          v-model="selectedParams.color">
          <option
              v-for="option in availableColors"
              :key="option.id"
              v-bind:value="option"
          >{{option.color}}</option>
        </select>
      </div>
    </div>
    <b-button variant="primary" @click="goBack">Zurück</b-button>
    <product
      v-for="product in shownProducts"
      :key="product.id"
      :product="product"
      :factorizedPaintArea="factorizedPaintArea">
    </product>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Product from "./Product";

export default {
  data() {
    return {
        area: null,
        factorizedPaintArea: null,
        shownProducts: [],
        selectedParams: {
          wallTexture: null,
          prevcolor: null,
          color: null
      },
    };
  },
  components: {
    "product": Product,
  },
  computed: {
    ...mapState("color", ["availableColors"]),
    ...mapState("product", ["availableProducts"]),
    ...mapState("parameter", ["availableParameters", "parameterDict"])
  },
  mounted(){
    this.$parent.title = "Farbbedarfsrechner";
    this.$parent.adminnavigation = false;
    this.loadData();
    this.getColors();
    this.getParameters().then(
      function() {
        this.calculateArea();
      }.bind(this)
    );
    this.getProducts().then(
      function() {
        this.filterProducts();
      }.bind(this)
    );
  },
  watch: {
    selectedParams: {
      handler: function (newVal, oldVal) {
        this.saveData(newVal);
        this.filterProducts();
      },
      deep: true
    },
  },
  methods: {
    ...mapActions("color", [
      "getColors"
    ]),
    ...mapActions("product", [
      "getProducts"
    ]),
    ...mapActions("parameter", [
      "getParameters"
    ]),
    goBack() {
      this.$router.push({ name: 'Parameterauswahl' });
    },
    loadData() {
      var selectedParams = localStorage.getItem("selectedParams");
      if (selectedParams) {
        this.selectedParams = JSON.parse(selectedParams);
      }
      var area = localStorage.getItem("area");
      if (area) {
        this.area = JSON.parse(area);
      }
    },
    saveData(data) {
      localStorage.setItem("selectedParams", JSON.stringify(data));
    },
    calculateArea() {
      var factorizedPaintArea = this.area * this.selectedParams.wallTexture.value;
      if (this.selectedParams.prevcolor.brightness == this.selectedParams.color.brightness) {
        factorizedPaintArea *= this.getPaintingTypeValue('gleiche Farbe');
      }
      else if (this.selectedParams.prevcolor.brightness < this.selectedParams.color.brightness) {
        factorizedPaintArea *= this.getPaintingTypeValue('dunkel auf hell');
      }
      else {
        factorizedPaintArea *= this.getPaintingTypeValue('hell auf dunkel');
      }
      this.factorizedPaintArea = factorizedPaintArea;
    },
    getPaintingTypeValue(label) {
      for (var i = 0; i < this.parameterDict['Anstrichart'].length; i++) {
        if (this.parameterDict['Anstrichart'][i]['label'] == label) {
            return this.parameterDict['Anstrichart'][i]['value'];
        }
      }
    },
    filterProducts() {
      this.shownProducts = [];
      if (this.selectedParams.color) {
        for (var i = 0; i < this.availableProducts.length; i++) {
            if (this.availableProducts[i].color == this.selectedParams.color.id) {
                this.shownProducts.push(this.availableProducts[i]);
            }
        }
      }
      else {
        this.shownProducts = this.availableProducts;
      }
    }
  }
}
</script>