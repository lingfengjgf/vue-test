import { createRouter, createWebHashHistory } from "vue-router";
// 导入页面组件
import Home from "../views/Home.vue";
import About from "../views/About.vue";

// 定义路由
const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
];

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
