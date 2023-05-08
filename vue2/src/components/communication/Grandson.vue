<template>
  <div>
    <h3 @click="someEvent">grandson</h3>
    <p>{{msg}}</p>
    <p>{{foo}}</p>
  </div>
</template>

<script>
export default {
  inject:['foo'],
  // inject:{
  //   'foo2':{ // 别名
  //     from:'foo',
  //     default:''
  //   }
  // },
  props:{
    msg:{
      type:String,
      default:''
    }
  },
  methods:{
    someEvent(){
      this.$emit('some-event','grandson someEvent')
    }
  }
}
</script>

<style>

</style>