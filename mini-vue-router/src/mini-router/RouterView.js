import { defineComponent, getCurrentInstance, h, unref } from "vue";

export default defineComponent({
  setup() {
    return () => {
      // 获取组件实例
      const {
        proxy: { $router },
      } = getCurrentInstance();
      // 1、获取要渲染的组件
      let component;
      // 通过current找到匹配的项
      const route = $router.options.routes.find(
        (route) => route.path === unref($router.current)
      );
      // 找到匹配的组件
      if (route) {
        component = route.component;
        return h(component, "router-view");
      } else {
        console.warn("no match component");
        return h("div", "");
      }
    };
  },
});
