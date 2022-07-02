import { defineStore } from "pinia";

export default defineStore("snackbar", {
  state() {
    return {
      message: null,
      actionMessage: null,
      actionMethod: null,
    };
  },
  actions: {
    new(message, actionMessage, actionMethod, timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;

      this.message = message;

      if (actionMessage && actionMethod) {
        this.actionMessage = actionMessage;

        switch (actionMethod) {
          case "close":
            this.actionMethod = this.reset;
            break;
          default:
            // action method can be any function
            this.actionMethod = actionMethod;
        }
      }

      if (timeout) {
        this.timeout = setTimeout(this.reset, timeout);
      }
    },
    reset() {
      this.message = null;
      this.actionMessage = null;
      this.actionMethod = null;
      clearTimeout(this.timeout);
      this.timeout = null;
    },
  },
});
