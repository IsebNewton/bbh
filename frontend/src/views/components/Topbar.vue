<template>
  <div>
    <div class="logo">
        <router-link :to="links[0].path" exact>
            <b-img src="assets/logo.jpg" height="50px" alt="Schönes Haus"></b-img>
        </router-link>
    </div>
    <div class="header">
        <h2>{{title}}</h2>
    </div>
  </div>
</template>

<script>
require("./../../../public/assets/logo.jpg");

export default {
    name: 'Topbar',
    props: {
        title: String
    },
    data() {
        return {
          links: this.$router.options.routes
        }
    },
}

</script>