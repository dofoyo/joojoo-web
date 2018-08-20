<template>
  <div id="app">
    <div class="row">
      <div class="col-md-1"><img src="../static/pics/timg.jpg"></div>
      <div class="col-md-1"><router-link to="/collectquestion">edit</router-link></div>
      <div class="col-md-1"><router-link to="/questionlist">Qustions</router-link></div>
      <div class="col-md-1"><router-link to="/questionlist2">Qustions2</router-link></div>
      <div class="col-md-1"><router-link to="/knowledgeTagChart">knowledgeTag</router-link></div>
      <div class="col-md-1"><router-link to="/wrongTagChart">wrongTag</router-link></div>
      <div class="col-md-1"><router-link to="/wrongRateChart">wrongRate</router-link></div>
      <div class="col-md-1"><router-link to="/difficultyChart">difficulty</router-link></div>
      <div class="col-md-1"><router-link to="/collectImage">collect</router-link></div>
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
