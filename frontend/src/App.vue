<template>
<body id="app">
  <header>
    <b-img src="assets/logo.jpg" height="50px" alt="Schönes Haus"></b-img>
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
require("./../public/assets/logo.jpg")
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap");

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

  .logo {
    width: 20%;
  }
}

.container {
  margin-top: 30px;
  text-align: center;
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
</style>
