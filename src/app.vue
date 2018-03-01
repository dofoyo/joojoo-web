<template>
  <div id="app">
    <div class="row">
      <div class="col-md-1"><img src="../static/pics/timg.jpg"></div>
      <div class="col-md-1"><router-link to="/collectquestion">collect question</router-link></div>
      <div class="col-md-1"><router-link to="/questionlist">Qustion List</router-link></div>
      <div class="col-md-1"><router-link to="/knowledgeTagChart">knowledgeTagChart</router-link></div>
      <div class="col-md-1"><router-link to="/wrongTagChart">wrongTagChart</router-link></div>
      <div class="col-md-1"><router-link to="/wrongRateChart">wrongRateChart</router-link></div>
      <div class="col-md-1"><router-link to="/difficultyChart">difficultyChart</router-link></div>
      <div class="col-md-1"><router-link to="/collectImage">collectImage</router-link></div>
      <div class="col-md-1"><router-link to="/fileupload">fileupload</router-link></div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;


  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
  margin-left: 20px;

}
</style>
