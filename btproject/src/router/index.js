import { createRouter, createWebHistory } from "vue-router";
import LoginPageView from "@/views/LoginPageView.vue";
import HawkerExploreView from "@/views/HawkerExploreView.vue";
import NEADashboardView from "@/views/NEADashboardView.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginPageView,
  },
  {
    path: "/hawker/profile/:id",
    name: "HawkerExploreView",
    component: HawkerExploreView,
  },
  {
    path: "/NEA/dashboard/:id",
    name: "NEADashboardView",
    component: NEADashboardView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
