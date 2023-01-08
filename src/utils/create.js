import Vue from 'vue';
export default function(Comp,props){
  // 创建组件实例
  const Ctor = Vue.extend(Comp);
  const comp = new Ctor({
    propsData:props
  })

  // 将组件挂载到body上
  comp.$mount() // 执行空挂载，获取dom
  document.body.appendChild(comp.$el);

  // 销毁组件
  comp.remove = () =>{
    document.body.removeChild(comp.$el);
    comp.$destroy();
  }

  // 返回组件实例
  return comp;
}