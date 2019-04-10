<template>
  <div id="app">
    <Appheader/>
    <router-view/>
  </div>
</template>

<script>
import Appheader from '@/components/AppHeader'
export default {
  name: 'App',
  components: {Appheader}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
