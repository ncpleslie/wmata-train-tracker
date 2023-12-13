import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import { Route } from "@wmata-train-tracker/shared";
import IndexPage from "@/pages/IndexPage.vue";
import StationsPage from "@/pages/StationsPage.vue";
import IncidentsPage from "@/pages/IncidentsPage.vue";

const routes: RouteRecordRaw[] = [
  { path: Route.Index, component: IndexPage },
  { path: Route.Stations, component: StationsPage },
  { path: Route.Incidents, component: IncidentsPage },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
