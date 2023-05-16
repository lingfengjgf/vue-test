import { createRenderer } from "../runtime-core";

let renderer;

// dom平台特有的节点操作
const rendererOptions = {
  querySelector(selector) {
    return document.querySelector(selector);
  },
  insert(child, parent, anchor) {
    // anchor为null则为appendChild
    parent.insertBefore(child, anchor || null);
  },
  setElementText(el, text) {
    el.textContent = text;
  },
  createElement(tag) {
    return document.createElement(tag);
  },
  remove(el) {
    const parent = el.parentNode;
    if (parent) {
      parent.removeChild(el);
    }
  },
};

// 确保renderer单例
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}

// 创建app实例
export function createApp(rootComponent) {
  // 接收根组件，返回app实例
  const app = ensureRenderer().createApp(rootComponent);

  // 扩展mount，根据传入的选择器获取节点
  const mount = app.mount;
  app.mount = function (selectorOrContainer) {
    const container = document.querySelector(selectorOrContainer);
    mount(container);
  };
  return app;
}
