// import { createApp } from 'vue'
import { createApp } from "./mini-vue";
import { createVNode } from "./mini-vue/runtime-core";
import "./style.css";
// import App from "./App.vue";

createApp({
  data() {
    return {
      title: ["Hello", "mini-vue!", "hhh"],
    };
  },
  render() {
    // const h3 = document.createElement("h3");
    // h3.textContent = this.title;
    // return h3;
    // 返回虚拟dom

    if (Array.isArray(this.title)) {
      return createVNode(
        "h3",
        {},
        this.title.map((t) => createVNode("p", {}, t))
      );
    } else {
      return createVNode("h3", {}, this.title);
    }
  },
  mounted() {
    setTimeout(() => {
      // this.title = "data change!";
      this.title = ["data", "change!"];
    }, 2000);
  },
}).mount("#app");
