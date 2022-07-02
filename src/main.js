/* Vue */
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

/* PostCSS */
import "./index.css";

/* Fontawesome */
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

library.add(faCircleInfo);

/* Config */
createApp(App)
  .use(createPinia())
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
