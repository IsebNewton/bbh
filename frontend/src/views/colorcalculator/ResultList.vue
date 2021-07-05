<template>
  <div class="bg-paint d-flex w-100 h-100 overflow-auto">
    <div class="container">
      <h2 class="text-center text-shadow mb-5 mt-3">
        Sie haben {{ area.toFixed(1) }} m² zu streichen
      </h2>

      <div class="d-flex align-items-center justify-content-between mb-3">
        <b-button @click="goBack()" variant="primary">zurück</b-button>

        <div>
          <label class="text-shadow text-bold"> gewählte Farbe: </label>
          <dropdown
            id="inputColor"
            :items="availableColors"
            :value="selectedParams.color"
            @change="changedColor"
            useText="color"
          >
          </dropdown>
        </div>
      </div>

      <product
        class="mb-4"
        v-for="product in shownProducts"
        :key="product.id"
        :product="product"
        :factorizedPaintArea="factorizedPaintArea"
      ></product>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Dropdown from "../components/Dropdown";
import Product from "./Product";

export default {
  data() {
    return {
      area: 0,
      factorizedPaintArea: null,
      shownProducts: [],
      selectedParams: {
        wallTexture: null,
        prevcolor: null,
        color: null,
      },
    };
  },
  components: {
    dropdown: Dropdown,
    product: Product,
  },
  computed: {
    ...mapState("color", ["availableColors"]),
    ...mapState("product", ["availableProducts"]),
    ...mapState("parameter", ["availableParameters", "parameterDict"]),
  },
  mounted() {
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
      handler: function(newVal, oldVal) {
        this.saveData(newVal);
        this.filterProducts();
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions("color", ["getColors"]),
    ...mapActions("product", ["getProducts"]),
    ...mapActions("parameter", ["getParameters"]),
    goBack() {
      this.$router.push({ name: "Parameterauswahl" });
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
      var factorizedPaintArea =
        this.area * this.selectedParams.wallTexture.value;
      if (
        this.selectedParams.prevcolor.brightness ==
        this.selectedParams.color.brightness
      ) {
        factorizedPaintArea *= this.getPaintingTypeValue("gleiche Farbe");
      } else if (
        this.selectedParams.prevcolor.brightness <
        this.selectedParams.color.brightness
      ) {
        factorizedPaintArea *= this.getPaintingTypeValue("dunkel auf hell");
      } else {
        factorizedPaintArea *= this.getPaintingTypeValue("hell auf dunkel");
      }
      this.factorizedPaintArea = factorizedPaintArea;
    },
    getPaintingTypeValue(label) {
      for (var i = 0; i < this.parameterDict["Anstrichart"].length; i++) {
        if (this.parameterDict["Anstrichart"][i]["label"] == label) {
          return this.parameterDict["Anstrichart"][i]["value"];
        }
      }
    },
    filterProducts() {
      this.shownProducts = [];
      if (this.selectedParams.color) {
        for (var i = 0; i < this.availableProducts.length; i++) {
          for (var j = 0; j < this.availableProducts[i].color.length; j++) {
            if (
              this.availableProducts[i].color[j] == this.selectedParams.color.id
            ) {
              this.shownProducts.push(this.availableProducts[i]);
            }
          }
        }
      } else {
        this.shownProducts = this.availableProducts;
      }
    },
    changedColor(color) {
      this.selectedParams.color = color;
    },
  },
};
</script>
