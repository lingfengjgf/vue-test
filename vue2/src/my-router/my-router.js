let Vue;

class VueRouter {
  constructor(options){
    this.$options=options;

    // Vue.util.defineReactive(this,'current',window.location.hash.slice(1)||'/')

    this.current=window.location.hash.slice(1)||'/';
    Vue.util.defineReactive(this,'matched',[]);
    this.match();
    window.addEventListener('hashchange',()=>{
      // console.log(window.location.hash);
      this.current=window.location.hash.slice(1)||'/';
      this.matched=[];
      this.match();
    })
  }

  match(el){
    const routes=el||this.$options.routes;
    for (const route of routes) {
      if(this.current==='/'&&route.path==='/'){
        this.matched.push(route);
        return ;
      }
      if(route.path!='/'&&this.current.indexOf(route.path)>-1){
        this.matched.push(route);
        route.children&&this.match(route.children);
        return ;        
      }
    }
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
      //获取当前router-view的深度
      this.$vnode.data.routerView=true;
      let parent=this.$parent;
      let depth=0;
      // console.log('parent:',parent);
      while(parent){
        const vnodeData=parent.$vnode&&parent.$vnode.data;
        if(vnodeData&&vnodeData.routerView){
          depth++;
        }
        parent=parent.$parent;
      }
      // console.log(depth);
      // console.log("$router:",this.$router);
      // console.log("current:",this.$router.current);
      // const routes=this.$router.$options.routes;
      // console.log("routes:",routes);

      // console.log("matched:",this.$router.matched);
      const route=this.$router.matched[depth];
      let component=null;
      if(route){
        component=route.component;
      }
      return h(component)
    }
  })
}

export default VueRouter