import Vue from "vue";
import VueRouter from "vue-router";

import CalculationFactors from "../views/manage/CalculationFactors.vue";
import Colorcalculator from "../views/colorcalculator/Colorcalculator.vue";
import Home from "../views/Home.vue";
import Impress from "../views/Impress.vue";
import Login from "../views/manage/Login.vue";
import PaintWall from "../views/colorcalculator/PaintWall.vue";
import PaintNotRectRoom from "../views/colorcalculator/PaintNotRectRoom.vue";
import PaintRectRoom from "../views/colorcalculator/PaintRectRoom.vue";
import ParameterSelection from "../views/colorcalculator/ParameterSelection.vue";
import Privacy from "../views/Privacy.vue";
import Products from "../views/manage/Products.vue";
import ResultList from "../views/colorcalculator/ResultList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/calculationfactors",
    name: "Berechnungsfaktoren",
    component: CalculationFactors,
  },
  {
    path: "/colorcalculator",
    name: "Farbrechner",
    component: Colorcalculator,
  },
  {
    path: "/impress",
    name: "Impressum",
    component: Impress,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/paintwall",
    name: "WandStreichen",
    component: PaintWall,
  },
  {
    path: "/paintnotrectroom",
    name: "NichtRechteckigesZimmerStreichen",
    component: PaintNotRectRoom,
  },
  {
    path: "/paintrectroom",
    name: "RechteckigesZimmerStreichen",
    component: PaintRectRoom,
  },
  {
    path: "/privacy",
    name: "Datenschutz",
    component: Privacy,
  },
  {
    path: "/parameterselection",
    name: "Parameterauswahl",
    component: ParameterSelection,
  },
  {
    path: "/products",
    name: "Produkte",
    component: Products,
  },
  {
    path: "/resultlist",
    name: "Resultlist",
    component: ResultList,
  },
];

export const router = new VueRouter({
  mode: "hash",
  routes,
});