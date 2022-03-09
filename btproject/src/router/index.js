import { createRouter, createWebHistory } from "vue-router";
import LoginPageView from "@/views/LoginPageView.vue";
import HawkerExploreView from "@/views/HawkerExploreView.vue";
import NEADashboardView from "@/views/NEADashboardView.vue";
import HawkerProfileView from "@/views/HawkerProfileView.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginPageView,
  },
  {
    path: "/hawker/explore/:id",
    name: "HawkerExploreView",
    component: HawkerExploreView,
  },
  {
    path: "/NEA/dashboard/:id",
    name: "NEADashboardView",
    component: NEADashboardView,
  },
  {
    path: '/hawker/profile/:id',
    name: 'HawkerProfile',
    component: HawkerProfileView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
