<template>
  <div>
    <table>
      <thead>
        <th v-for="(item,i) in columms" :key="i">{{item.label}}</th>
      </thead>
      <tbody>
        <tr v-for="(row,rowIndex) in rows" :key="rowIndex">
          <td v-for="(col,colIndex) in row" :key="colIndex">{{col}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// template
export default {
  props:{
    data:{
      type:Array,
      require:true
    }
  },
  data(){
    return {
      theadList:[],
      tdList:[],
    }
  },
  computed:{
    columms(){
      return this.$slots.default.map(({data})=>{
        return {
          label:data.attrs.label,
          prop:data.attrs.prop,
        }
      })
    },
    rows(){
      return this.data.map(item=>{
        let res={};
        this.columms.forEach(({prop})=>{
          res[prop]=item[prop];
        })
        return res;
      })
    }
  },
}
</script>

<style>

</style>