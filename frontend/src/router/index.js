import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/impress",
    name: "Impressum",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Impress.vue"),
  },
  {
    path: "/privacy",
    name: "Datenschutz",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Privacy.vue"),
  },
];

export const router = new VueRouter({
  mode: "history",
  routes,
});