import { reactive, effect } from "../reactivity";
import { createVNode } from "./vnode";

export { createVNode } from "./vnode";
export function createRenderer(options) {
  const { createElement: hostCreateElement, insert: hostInsert } = options;
  // render负责渲染组件内容
  // const render = (rootComponent, selector) => {
  //   // 获取宿主
  //   const container = options.querySelector(selector);

  //   // 响应式处理
  //   let observed = reactive(rootComponent.data());

  //   // 定义更新函数
  //   const componentUpdateFn = () => {
  //     // 渲染视图
  //     const el = rootComponent.render.call(observed);
  //     // 清空之前的文字
  //     options.setElementText(container, "");
  //     // 追加到宿主
  //     options.insert(el, container);
  //   };

  //   // 设置激活的副作用
  //   effect(componentUpdateFn);

  //   componentUpdateFn();

  //   // 挂载钩子
  //   if (rootComponent.mounted) {
  //     rootComponent.mounted.call(observed);
  //   }
  // };

  // 虚拟dom版本
  const render = (vndoe, container) => {
    // 如果存在vnode，则为patch或mount，否则为unmount
    if (vndoe) {
      patch(container._vnode || null, vndoe, container);
    }

    // 保存最新的vnode
    container._vnode = vndoe;
  };

  const patch = (n1, n2, container) => {
    // 如果n2中的type为字符串，说明是原生节点element，否则为组件
    const { type } = n2;
    if (typeof type === "string") {
      // element
      processElement(n1, n2, container);
    } else {
      // component
      processComponent(n1, n2, container);
    }
  };

  const processComponent = (n1, n2, container) => {
    if (n1 === null) {
      // mount
      mountComponent(n2, container);
    } else {
      // patch
      patch(n1, n2, container);
    }
  };

  // 挂载做3件事
  // 1、组件实例化
  // 2、状态初始化
  // 3、副作用安装
  const mountComponent = (initialVNode, container) => {
    // 创建组件实例
    const instance = {
      data: {},
      vndoe: initialVNode,
      isMounted: false,
    };

    // 初始化组件状态
    const { data: dataOptions } = instance.vndoe.type;
    instance.data = reactive(dataOptions());

    // 安装渲染函数的副作用
    setupRenderEffect(instance, container);
  };

  const setupRenderEffect = (instance, container) => {
    // 声明组件更新函数
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        // 创建阶段
        // 执行组件渲染函数获取其vnode
        const { render, mounted } = instance.vndoe.type;
        const vnode = render.call(instance.data);
        // 递归patch嵌套节点
        patch(null, vnode, container);
        // 挂载钩子
        if (mounted) {
          mounted.call(instance.data);
        }
      } else {
        // 更新阶段
      }
    };

    // 建立更新机制
    effect(componentUpdateFn);

    // 首次执行组件更新函数
    componentUpdateFn();
  };

  const processElement = (n1, n2, container) => {
    if (n1 === null) {
      // 创建阶段
      mountElement(n2, container);
    }
  };

  const mountElement = (vnode, container) => {
    const el = (vnode.el = hostCreateElement(vnode.type));

    if (typeof vnode.children === "string") {
      // children为文本
      el.textContent = vnode.children;
    } else {
      // 数组需要递归创建
      vnode.children.forEach((child) => patch(null, child, el));
    }

    // 插入元素
    hostInsert(el, container);
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
      mount(container) {
        // 创建根组件vnode
        const vnode = createVNode(rootComponent);
        // render作用：将虚拟dom转换为真实dom并追加至宿主
        render(vnode, container);
      },
    };
    return app;
  };
}
