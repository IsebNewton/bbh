<template>
  <div class="container">
    <h1 class="text-center text-shadow">
      Sie haben folgende Fläche zu streichen: {{area}} m²
    </h1>
    <h3 class="text-shadow mb-5">
      Sie haben folgende Farbe gewählt: {{(color && color.color) ? color.color : ""}}
    </h3>
    <product
      v-for="product in shownProducts"
      :key="product.id"
      :product="product"
      :area="area">
    </product>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { mapGetters } from "vuex";
import Product from "./Product";

export default {
  data() {
    return {
        area: null,
        color: null,
        shownProducts: []
    };
  },
  components: {
    "product": Product,
  },
  computed: {
    ...mapState("product", ["availableProducts"]),
  },
  mounted(){
    this.$parent.title = "Farbbedarfsrechner";
    this.$parent.adminnavigation = false;
    this.area = this.getArea();
    this.color = this.getColor();
    this.getProducts().then(
      function() {
        if (this.color) {
          for (var i = 0; i < this.availableProducts.length; i++) {
              if (this.availableProducts[i].color == this.color.id) {
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
    ...mapGetters("colorcalculator", [
        "getArea",
        "getColor"
    ]),
    ...mapActions("product", [
      "getProducts"
    ]),
  }
}
</script>