<template>
  <div>
    <h3>child1</h3>
    <!-- 属性、事件透传 -->
    <Grandson v-bind="$attrs" v-on="$listeners" />
    <!-- 插槽 -->
    <slot bar="bar"></slot>
  </div>
</template>

<script>
import Grandson from './Grandson'
export default {
  name:'Child1',
  components:{
    Grandson
  }

}
</script>

<style>

</style>