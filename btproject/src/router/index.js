import { createRouter, createWebHistory } from "vue-router";
import LoginPageView from "@/views/LoginPageView.vue";
import HawkerExploreView from "@/views/HawkerExploreView.vue";
import NEADashboardView from "@/views/NEADashboardView.vue";
import HawkerProfileView from "@/views/HawkerProfileView.vue";
import TenderFormView from "@/views/TenderFormView.vue";
import ErrorPageView from "@/views/ErrorPageView.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
  {
    path: "/:catchAll(.*)",
    name: "ErrorPageView",
    component: ErrorPageView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authUser = getAuth();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  onAuthStateChanged(authUser, (user) => {
    if (!user && requiresAuth) {
      next("/");
    } else {
      next();
    }
  });
});

export default router;
