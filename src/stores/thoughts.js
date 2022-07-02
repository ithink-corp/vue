import { defineStore } from "pinia";

export default defineStore("thoughts", {
  state() {
    return {
      items: [],
    };
  },
  actions: {
    async load() {
      const res = await fetch("https://ithink-api.cyclic.app/", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const items = await res.json();

      this.items = items;
    },
    async add(message) {
      await fetch("https://ithink-api.cyclic.app/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: message,
        }),
      });

      this.items.unshift(message);
    },
  },
});
