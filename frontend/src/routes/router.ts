import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import IndexPage from "../pages/IndexPage.vue";
import StationsPage from "../pages/StationsPage.vue";
import IncidentsPage from "../pages/IncidentsPage.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", component: IndexPage },
  { path: "/stations", component: StationsPage },
  { path: "/incidents", component: IncidentsPage },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
