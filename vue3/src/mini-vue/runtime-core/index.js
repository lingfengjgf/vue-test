export function createRenderer(options) {
  // render负责渲染组件内容
  const render = (rootComponent, selector) => {
    // 获取宿主
    const container = options.querySelector(selector);
    // 渲染视图
    const el = rootComponent.render.call(rootComponent.data());
    // 追加到宿主
    options.insert(el, container);
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
