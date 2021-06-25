<template>
<body id="app">
  <header>
    <topbar :title="title"></topbar>
  </header>
  <router-view />
  <footer>
    <div class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/privacy">Datenschutz</router-link>
      <router-link to="/impress">Impressum</router-link>
    </div>
  </footer>
</body>
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

<style lang="scss">
:root {
  --font: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
  --textColor: #374961;
  --linkActiveColor: #41b783;
  --primaryColor: #3D48AF;
  --secondaryColor: #444444;
  --tertiaryColor: #343434;
  --grey: #EDEDED;
}

#app {
  font-family: var(--font);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--textColor);
}

.container {
  margin-top: 30px;
  text-align: center;
}

.content {
  float: left;
  text-align: center;
  width: 40%;
  margin: 30px;
}

.leftform {
  float: left;
  text-align: center;
  width: 55%;
}

.formsection {
  margin: 10px;
}

.formlabel {
  text-align: left;
  float: left;
  width: 30%;
  margin: 10px;
}

.formfield {
  text-align: left;
  float: left;
  width: 40%;
  margin: 10px;
}

.logo {
  float: left;
}

.header {
  float: left;
  text-align: center;
  color: #FFFFFF;
  width: 88%;
  margin-top: 5px;
}

.central {
  text-align: center;
  margin: 50px;
}

.subcontent {
  text-align: center;
  margin: 10px;
  background-color: var(--grey);
  padding: 20px;
}

.nav {
  padding: 20px;
  a {
    font-weight: 500;
    color: var(--textColor);
    margin: 0 5px;
  }

  a.router-link-exact-active {
    color: var(--linkActiveColor);
  }
}

body{ height:100vh; margin:0; }

header{ min-height:50px; background: var(--primaryColor); }
footer{ min-height:50px; background:var(--grey) }

/* Trick */
body{ 
  display:flex; 
  flex-direction:column; 
}

footer{
  margin-top:auto; 
}

.colorcalculator{
    background-image: url("https://puu.sh/HRFhn/1aacf9bea8.png");
}
</style>
