<template>
  <div class="container">
    <h2>{{product.name}}</h2>
    <label>benötigt: ~{{Math.round(product.coverage / 1000 * area * 100) / 100}} L</label>
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
  },
  watch: {
  },
  methods: {
  }
}
</script>