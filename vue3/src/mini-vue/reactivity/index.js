// 创建一个激活的副作用，也就是当前的更新函数
let activeEffect;

export function effect(fn) {
  activeEffect = fn;
}

// 接收一个需要响应式处理的对象，返回一个代理对象
export function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      const value = Reflect.get(target, key);
      // 依赖收集
      track(target, key);
      return value;
    },
    set(target, key, value) {
      const res = Reflect.set(target, key, value);
      // 依赖触发
      trigger(target, key);
      return res;
    },
    deleteProperty(target, key) {
      const res = Reflect.deleteProperty(target, key);
      // 依赖触发
      trigger(target, key);
      return res;
    },
  });
}

// 创建一个Map保存依赖关系
const targetMap = new WeakMap();

function track(target, key) {
  if (activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()));
    }

    // 获取depsMap中key对应的值
    let deps = depsMap.get(key);
    if (!deps) {
      depsMap.set(key, (deps = new Set()));
    }

    // 添加当前的激活的副作用函数
    deps.add(activeEffect);
  }
}

function trigger(target, key) {
  let depsMap = targetMap.get(target);
  if (depsMap) {
    let deps = depsMap.get(key);
    if (deps) {
      deps.forEach((dep) => dep());
    }
  }
}
