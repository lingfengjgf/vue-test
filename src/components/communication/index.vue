<template>
  <div>
    <h3>index</h3>
    <child1 msg='msg from index' @some-event="onSomeEvent" >
        <!-- 作用域插槽 -->
        <template v-slot:default="slotProps">来自子组件的数据:{{slotProps.bar}}</template>
    </child1>
    <child2 msg='msg from index'  />
  </div>
</template>

<script>
import Child1 from './Child1';
import Child2 from './Child2';
export default {
  provide(){
    return {
      // 若传入的是普通值，不具备响应式
      // 若传入的是响应式数据，则具备响应式
      foo:'foo from index'
    }
  },
  components:{
    Child1,
    Child2
  },
  methods:{
    onSomeEvent(e){
      console.log('onSomeEvent:',e)
    }
  }
}
</script>

<style>

</style>