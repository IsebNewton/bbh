<template>
  <div class="shadow bg-white">
    <div class="row align-items-center">
      <div class="col-2">
        <div class="ratio ratio-1x1">
          <img
            class="img-contain"
            :src="product.images[0]"
            :alt="'Bild von ' + product.name"
          />
        </div>
      </div>

      <h3 class="col-3">{{ product.name }}</h3>

      <div class="col-3 text-center">
        benötigt:<br />
        ~{{
          Math.round((product.coverage / 1000) * factorizedPaintArea * 100) /
            100
        }}
        L
      </div>

      <div class="col-2">
        <table class="text-end text-nowrap">
          <tr
            v-for="sizeVariant in product.sizeVariants"
            :key="sizeVariant.size"
          >
            <td class="pe-2">{{ sizeVariant.size }} L</td>
            <td>{{ sizeVariant.price }} €</td>
          </tr>
        </table>
      </div>

      <div class="col-2">
        <a
          class="btn btn-primary btn-lg active"
          :href="product.link"
          target="_blank"
          >zum Shop</a
        >
      </div>
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
