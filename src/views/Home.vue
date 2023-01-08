<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <!-- <Communication /> -->
    <Form></Form>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Communication from '@/components/communication/index.vue'
import Form from '@/components/Form';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Communication,
    Form
  }
}
</script>
