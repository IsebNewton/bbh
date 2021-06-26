<template>
<div class="h-100 w-100 d-flex flex-column">
  <topbar :title="title"></topbar>
  <div class="flex-fill overflow-auto d-flex">
    <router-view class="m-auto" />
  </div>
  <footer class="bg-secondary p-3 d-flex justify-content-start">
      <router-link class="me-3 text-body text-decoration-none" to="/">Home</router-link>
      <router-link class="me-3 text-body text-decoration-none" to="/privacy">Datenschutz</router-link>
      <router-link class="me-3 text-body text-decoration-none" to="/impress">Impressum</router-link>
  </footer>
</div>
</template>

<script>
import Topbar from './views/components/Topbar.vue';

export default {
  data() {
    return {
      title: 'Test'
    };
  },
  components: {
    "topbar": Topbar
  },
  computed: {
  },
  mounted(){
  },
  watch: {
  },
  methods: {
  }
}
</script>
