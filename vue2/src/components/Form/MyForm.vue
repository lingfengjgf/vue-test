<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props:{
    label:{
      type:String,
      default:''
    },
    model:{
      type:Object,
      require:true
    },
    rules:Object
  },
  provide(){
    return {
      form:this
    }
  },
  data(){
    return {
      error:''
    }
  },
  methods:{
    validate(cb){
      const promises = this.$children.filter(child=>child.prop).map(child=>child.validate());
      Promise.all(promises).then(()=>cb(true)).catch(()=>cb(false));
    }
  }
}
</script>

<style>

</style>