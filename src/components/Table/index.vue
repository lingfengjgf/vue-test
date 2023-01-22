<template>
  <div>
    <my-table :data="tableData">
      <my-table-columm label="日期" prop="date"></my-table-columm>
      <my-table-columm label="姓名" prop="name"></my-table-columm>
      <my-table-columm label="地址" prop="address"></my-table-columm>
    </my-table>
    <!-- 自定义列模板 -->
    <my-table :data="tableData">
      <my-table-columm label="日期" prop="date"></my-table-columm>
      <my-table-columm label="姓名" prop="name"></my-table-columm>
      <my-table-columm label="地址" prop="address"></my-table-columm>
      <my-table-columm label="操作">
        <template v-slot="scope">
          <button @click="editClick(scope.$index,scope.row)">编辑</button>
          <button @click="delClick(scope.$index,scope.row)">删除</button>
        </template>
      </my-table-columm>
    </my-table>
    <!-- 排序 -->
    <my-table :data="tableData">
      <my-table-columm sortable label="日期" prop="date"></my-table-columm>
      <my-table-columm label="姓名" prop="name"></my-table-columm>
      <my-table-columm sortable label="地址" prop="address"></my-table-columm>
      <my-table-columm label="操作">
        <template v-slot="scope">
          <button @click="editClick(scope.$index,scope.row)">编辑</button>
          <button @click="delClick(scope.$index,scope.row)">删除</button>
        </template>
      </my-table-columm>
    </my-table>
  </div>
</template>

<script>
import MyTable from './MyTable.vue';
import MyTableColumn from './MyTableColumn.vue';
export default {
  components:{
    MyTable,
    MyTableColumn,
  },
  data(){
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods:{
    editClick(i,row){
      console.log('editClick:',i,row);
    },
    delClick(i,row){
      console.log('delClick:',i,row);
    },
  }
}
</script>

<style>

</style>