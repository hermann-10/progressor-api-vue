import { createApp } from "vue"; //C'est ici qu'on crée notre application
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

createApp(App)
  .use(router)
  .mount("#app");
