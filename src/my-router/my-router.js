let Vue;

class VueRouter {
  constructor(options){
    this.$options=options;

    Vue.util.defineReactive(this,'current',window.location.hash.slice(1)||'/')
    window.addEventListener('hashchange',()=>{
      // console.log(window.location.hash);
      this.current=window.location.hash.slice(1)||'/'
    })
  }
}

VueRouter.install=(_Vue)=>{
  Vue=_Vue;
  // console.log(Vue);

  //注册 $router

  Vue.mixin({
    beforeCreate(){
      // console.log("beforeCreated:",this.$options);
      if(this.$options.router){
        Vue.prototype.$router=this.$options.router
      }
    }
  })

  //注册组件 router-link
  Vue.component('router-link',{
    props:{
      to:{
        type:String,
        require:true
      }
    },
    render(h){
      return h('a',{attrs:{href:'#'+this.to}},this.$slots.default)
    }
  })

  //注册组件 router-view
  Vue.component('router-view',{
    render(h){
      // console.log("$router:",this.$router);
      // console.log("current:",this.$router.current);
      const routes=this.$router.$options.routes;
      // console.log("routes:",routes);
      const route=routes.find(route=>route.path===this.$router.current);
      let component=null;
      if(route){
        component=route.component;
      }
      return h(component)
    }
  })
}

export default VueRouter