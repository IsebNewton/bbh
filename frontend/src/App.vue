<template>
<div class="h-100 w-100 d-flex flex-column">
  <topbar :title="title"></topbar>
  <div class="flex-fill overflow-auto d-flex">
    <sidebar-menu v-if="adminnavigation" :menu="menu" relative width="250px"></sidebar-menu>
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
import { SidebarMenu } from 'vue-sidebar-menu'
import Topbar from './views/components/Topbar.vue';

export default {
  data() {
    return {
      title: '',
      menu: [
        {
          header: true,
          title: 'BBH Administration',
          hiddenOnCollapse: true
        },
        {
          href: '/products',
          title: 'Produktübersicht',
          icon: 'fa fa-user'
        },
        {
          href: '/calculationfactors',
          title: 'Berechnungsfaktoren',
          icon: 'fa fa-user'
        },
      ],
      adminnavigation: false
    };
  },
  components: {
    "sidebar-menu": SidebarMenu,
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
