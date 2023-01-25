<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <br>
    <svg-icon iconClass="xn" />
    <svg-icon iconClass="yb" />
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <!-- <Communication /> -->
    <!-- <Form></Form> -->
    <Table />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Communication from '@/components/communication/index.vue'
import Form from '@/components/Form';
import Table from 'comps/Table'
// import '@/icon/svg/xn.svg'
console.log('VUE_APP_BASEURL',process.env.VUE_APP_BASEURL);
export default {
  name: 'Home',
  components: {
    HelloWorld,
    Communication,
    Form,
    Table
  }
}
</script>
