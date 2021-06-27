import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Impress from "../views/Impress.vue";
import Privacy from "../views/Privacy.vue";
import Index from "../views/colorcalculator/Index.vue";
import PaintWall from "../views/colorcalculator/PaintWall.vue";
import PaintRectRoom from "../views/colorcalculator/PaintRectRoom.vue";
import PaintNotRectRoom from "../views/colorcalculator/PaintNotRectRoom.vue";
import ResultList from "../views/colorcalculator/ResultList.vue";

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
    component: Impress,
  },
  {
    path: "/privacy",
    name: "Datenschutz",
    component: Privacy,
  },
  {
    path: "/colorcalculator",
    name: "Farbrechner",
    component: Index,
  },
  {
    path: "/paintwall",
    name: "Wand streichen",
    component: PaintWall,
  },
  {
    path: "/paintrectroom",
    name: "Rechteckiges Zimmer streichen",
    component: PaintRectRoom,
  },
  {
    path: "/paintnotrectroom",
    name: "Nicht rechteckiges Zimmer streichen",
    component: PaintNotRectRoom,
  },
  {
    path: "/resultlist",
    name: "Resultlist",
    component: ResultList,
  },
];

export const router = new VueRouter({
  mode: "history",
  routes,
});