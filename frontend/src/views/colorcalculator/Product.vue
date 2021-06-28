<template>
  <div class="container">
    <h2>{{product.name}}</h2>
    <label>benötigt: ~{{Math.round(product.coverage / 1000 * area * 100) / 100}} L</label>
    <div
      v-for="sizeVariant in product.sizeVariants"
      :key="sizeVariant.size">
      <p>{{sizeVariant.size}} L</p>
      <p>{{sizeVariant.price}} €</p>
    </div>
    <a class="btn btn-primary btn-lg active" :href="product.link">
        zum Shop
    </a>
  </div>
</template>        

<script>
export default {
  props: {
    product: Object,
    area: Number
  },
  data() {
    return {
    };
  },
  components: {
  },
  computed: {
  },
  mounted(){
    this.$parent.title = "Farbbedarfsrechner";
    this.$parent.adminnavigation = false;
  },
  watch: {
  },
  methods: {
  }
}
</script>