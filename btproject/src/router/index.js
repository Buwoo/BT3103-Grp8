import { createRouter, createWebHistory } from "vue-router";
import LoginPageView from "@/views/LoginPageView.vue";
import HawkerExploreView from "@/views/HawkerExploreView.vue";
import NEADashboardView from "@/views/NEADashboardView.vue";
import HawkerProfileView from "@/views/HawkerProfileView.vue";
import TenderFormView from "@/views/TenderFormView.vue";
import { getAuth } from "firebase/auth";

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginPageView,
  },
  {
    path: "/hawker/explore",
    name: "HawkerExploreView",
    component: HawkerExploreView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/NEA/dashboard",
    name: "NEADashboardView",
    component: NEADashboardView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/hawker/profile",
    name: "HawkerProfile",
    component: HawkerProfileView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    // path: '/hawker/dashboard/tenderForm/:id/:tenderID', //@Jon I changed this part to remove the :id
    path: "/hawker/dashboard/tenderForm/:tenderID",
    name: "TenderFormView",
    component: TenderFormView,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (getAuth().currentUser) {
      next();
    } else {
      next("/");
    }
  } else {
    next();
  }
});

export default router;
