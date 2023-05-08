

<script>
// jsx
export default {
  props:{
    data:{
      type:Array,
      require:true
    }
  },
  data(){
    return {
      orderField:'',
      orderBy:'desc',
    }
  },
  computed:{
    columms(){
      // 由于不一定有prop属性，内部如果有作用域插槽，就按照它来执行渲染
      return this.$slots.default.map(({data:{attrs,scopedSlots}})=>{
        const columm={...attrs};
        if(scopedSlots){
          // 自定义列表模板
          columm.renderCell=(row,i)=>(<div>{scopedSlots.default({row,$index:i})}</div>)
        }else{
          columm.renderCell=(row)=>(<div>{row[columm.prop]}</div>)
        }
        return columm
      })
    },
  },
  created(){
    // 如果columns里面存在sortable，则第一个sortable作为默认排序字段
    this.columms.forEach(col=>{
      if(col.hasOwnProperty('sortable')){
        if(col.prop&&!this.orderField){
          this.sort(col.prop,'desc')
        }
      }
    })
  },
  methods:{
    sort(field,by){
      this.orderField=field;
      this.orderBy=by;

      this.data.sort((a,b)=>{
        const v1=a[field];
        const v2=b[field];
        if(typeof v1 === 'number'){
          return by==='desc'?(v2-v1):(v1-v2);
        }else{
          return by==='desc'?v2.localeCompare(v1):v1.localeCompare(v2);
        }
      })
    }
  },
  render(){
    return (
      <table>
        <thead>
        {
          this.columms.map(col=>{
            if(col.hasOwnProperty('sortable')&&col.prop){
              let sortArrow='↓↑';
              if(this.orderField===col.prop){
                sortArrow=this.orderBy==='desc'?'↓':'↑';
              }
              return <th key={col.label} onClick={()=>{this.sort(col.prop,this.orderBy==='desc'?'asc':'desc')}}>{col.label}<span>{sortArrow}</span></th>
            }else{
              return <th key={col.label}>{col.label}<span></span></th>
            }    
          })
        }
        </thead>
        <tbody>
        {
          this.data.map((row,rowIndex)=>{
            return <tr key={rowIndex}>{
              this.columms.map((column,columnIndex)=>(
                <td key={columnIndex}>{column.renderCell(row,rowIndex)}</td>
              ))
            }</tr>;            
          })
        }
        </tbody>
      </table>
    )
  }
}
</script>

<style>

</style>