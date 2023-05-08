<template>
  <div>
    <my-form :model='user' :rules="rules" ref="loginForm">
      <my-form-item label="用户名：" prop='name'>
        <my-input v-model="user.name" placeholder="请输入用户名" />
      </my-form-item>
      <my-form-item label="密码：" prop='password'>
        <my-input v-model="user.password" placeholder="请输入密码" />
      </my-form-item>
      <my-form-item>
        <button @click="loginClick">登录</button>
      </my-form-item>
    </my-form>
  </div>
</template>

<script>
import MyInput from './MyInput.vue';
import MyFormItem from './MyFormItem.vue';
import MyForm from './MyForm.vue';
export default {
  components:{
    MyInput,
    MyFormItem,
    MyForm
  },
  data(){
    return {
      user:{
        name:'tom'
      },
      rules:{
        name:[
          {required:true,message:'请输入用户名'}
        ],
        password:[
          {required:true,message:'请输入密码'}
        ],
      }
    }
  },
  methods:{
    loginClick(){
      this.$refs.loginForm.validate(isValid=>{
        if(isValid){
          console.log('submit login');
        }else{
          this.$notice({
            title:"登录失败",
            message:'请重新登录',
            duration:1000
          })
        }
      })
    }
  }
}
</script>

<style>

</style>