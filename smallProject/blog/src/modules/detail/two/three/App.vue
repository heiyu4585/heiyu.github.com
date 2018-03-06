<template>
  <div id="app">
    <img src="./images/logo.png">
    <div>three</div>
    <Foot></Foot>
  </div>
</template>

<script>
  // import 'common/css/reset.css';
  import Hello from 'components/Foot'

  export default {
    name: 'app',
    components: {
        Foot
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
