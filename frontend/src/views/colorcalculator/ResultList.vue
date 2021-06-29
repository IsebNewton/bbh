<template>
  <div class="container">
    <h1 class="text-center text-shadow">
      Sie haben folgende Fläche zu streichen: {{area}} m²
    </h1>
    <h3 class="text-shadow mb-5">
      Sie haben folgende Farbe gewählt: {{(selectedParams && selectedParams.color && selectedParams.color.color) ? selectedParams.color.color : ""}}
    </h3>
    <product
      v-for="product in shownProducts"
      :key="product.id"
      :product="product"
      :area="factoredArea">
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
        factoredArea: null,
        shownProducts: [],
        selectedParams: null
    };
  },
  components: {
    "product": Product,
  },
  computed: {
    ...mapState("product", ["availableProducts"]),
    ...mapState("parameter", ["availableParameters", "parameterDict"])
  },
  mounted(){
    this.$parent.title = "Farbbedarfsrechner";
    this.$parent.adminnavigation = false;
    this.loadData();
    this.getParameters().then(
      function() {
        this.calculateArea();
      }.bind(this)
    );
    this.getProducts().then(
      function() {
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
      }.bind(this)
    );
  },
  watch: {
  },
  methods: {
    ...mapActions("product", [
      "getProducts"
    ]),
    ...mapActions("parameter", [
      "getParameters"
    ]),
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
    calculateArea() {
      var factoredArea = this.area * this.selectedParams.wallTexture.value;
      if (this.selectedParams.prevcolor.brightness == this.selectedParams.color.brightness) {
        factoredArea *= this.getPaintingTypeValue('gleiche Farbe');
      }
      else if (this.selectedParams.prevcolor.brightness < this.selectedParams.color.brightness) {
        factoredArea *= this.getPaintingTypeValue('dunkel auf hell');
      }
      else {
        factoredArea *= this.getPaintingTypeValue('hell auf dunkel');
      }
      this.factoredArea = factoredArea;
    },
    getPaintingTypeValue(label) {
      for (var i = 0; i < this.parameterDict['Anstrichart'].length; i++) {
        if (this.parameterDict['Anstrichart'][i]['label'] == label) {
            return this.parameterDict['Anstrichart'][i]['value'];
        }
      }
    },
  }
}
</script>