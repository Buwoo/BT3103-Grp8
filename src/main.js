import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import router from "./router/index.js";
import store from "./store.js";

createApp(App).use(router).use(store).mount("#app");
