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
};

// 确保renderer单例
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}

// 创建app实例
export function createApp(rootComponent) {
  // 接收根组件，返回app实例
  return ensureRenderer().createApp(rootComponent);
}
