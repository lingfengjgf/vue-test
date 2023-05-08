<template>
  <div>
    <div v-if="label">{{label}}</div>
    <slot></slot>
    <div style="color:red" v-if="error">{{error}}</div>
    <!-- <p>{{form.rules[prop]}}</p> -->
  </div>
</template>

<script>
import Validator from 'async-validator';
export default {
  inject:['form'],
  props:{
    label:{
      type:String,
      default:''
    },
    prop:String
  },
  data(){
    return {
      error:''
    }
  },
  methods:{
    validate(){
      // console.log('validate');
      // 获取规则和值
      const rules = this.form.rules[this.prop];
      const value = this.form.model[this.prop];
      // 加载校验库，获得校验器实例
      const validator = new Validator({[this.prop]:rules});
      return validator.validate({[this.prop]:value},(errors)=>{
        if(errors){
          this.error = errors[0].message;
        }else{
          this.error = '';
        }
      })
    }
  },
  mounted(){
    this.$on('validate',()=>{
      this.validate();
    })
  }
}
</script>

<style>

</style>