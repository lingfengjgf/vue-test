<template>
  <div>
    <input :value="value" @input="onInput" type="text" v-bind="$attrs">
  </div>
</template>

<script>
export default {
  inheritAttrs:false, // 使非属性特性不不继承到外层标签上
  props:{
    value:{
      type:String,
      default:''
    }
  },
  methods:{
    onInput(e){
      this.$emit('input',e.target.value);
      this.$parent.$emit('validate');
    }
  }
}
</script>

<style>

</style>