import { reactive } from "../reactivity";

export function createRenderer(options) {
  // render负责渲染组件内容
  const render = (rootComponent, selector) => {
    // 获取宿主
    const container = options.querySelector(selector);

    // 响应式处理
    let observed = reactive(rootComponent.data());

    // 定义更新函数
    const componentUpdateFn = () => {
      // 渲染视图
      const el = rootComponent.render.call(observed);
      // 追加到宿主
      options.insert(el, container);
    };
    componentUpdateFn();
  };

  // 返回一个渲染器实例
  return {
    render,
    // 提供给用户一个createApp方法
    createApp: createAppAPI(render),
  };
}

export function createAppAPI(render) {
  return function createApp(rootComponent) {
    const app = {
      mount(selector) {
        render(rootComponent, selector);
      },
    };
    return app;
  };
}
