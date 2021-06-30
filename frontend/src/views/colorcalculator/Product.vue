<template>
  <div class="d-flex align-items-center shadow mt-4">
    <div class="col-2">
      <div class="ratio ratio-1x1">
        <img
          class="img-contain"
          :src="product.images[0]"
          :alt="'Bild von ' + product.name"
        />
      </div>
    </div>
    <h2 class="col-3 mx-3">{{ product.name }}</h2>
    <div class="col-2 text-center">
      benötigt:<br />
      ~{{ Math.round((product.coverage / 1000) * factorizedPaintArea * 100) / 100 }} L
    </div>
    <table class="col-1 offset-1 text-end">
      <tr v-for="sizeVariant in product.sizeVariants" :key="sizeVariant.size">
        <td>{{ sizeVariant.size }} L</td>
        <td>{{ sizeVariant.price }} €</td>
      </tr>
    </table>
    <div class="col-2 offset-1">
      <a
        class="btn btn-primary btn-lg active"
        :href="product.link"
        target="_blank"
        >zum Shop</a
      >
    </div>
  </div>
</template>        

<script>
export default {
  props: {
    product: Object,
    factorizedPaintArea: Number, // zu streichene Fläche mit Berücksichtigung der Faktoren (bereits berechnet)
  },
  data() {
    return {};
  },
  components: {},
  computed: {},
  mounted() {
    this.$parent.title = "Farbbedarfsrechner";
    this.$parent.adminnavigation = false;
  },
  watch: {},
  methods: {},
};
</script>