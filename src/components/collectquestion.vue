<template>
  <div class="collectquestion">
    <div class="row">
      <div class="col-md-4"><h2>{{msg}}</h2></div>
      <div class="col-md-2" align="right">
        <button type="button" class="btn btn-primary" @click="refresh">刷新</button>
      </div>
    </div>
    <table class="table table-striped table-bordered">
      <tbody>
      <tr v-for="(question,index) in questions">
        <td>{{index+1}}</td>
        <td>
          <router-link :to="{name:'questionview',params:{id:question.id}}">
              <img :src="question.originalImageUrl" class="img-circle">
          </router-link>
        </td>
        <td align="left">
          {{question.content}}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'collectquestion',
  data () {
    return {
      msg: 'collect question',
      questions:[]
    }
  },
  mounted: function() {
      this.getData();
  },
  methods:{
    getData:function(){

      var vm = this;
      var apiurl = process.env.API_ROOT + 'questions';
      var resource = vm.$resource(apiurl);
      
      resource.get({orderBy:"orderByContent"})
              .then((response) => {
                vm.questions = response.data.content;
                //console.log(vm.questions);
             })
              .catch(function(response) {
                console.log("there are something wrong!!!");
                console.log(response);
              })

    },
    refresh:function(){
      var root = process.env.API_ROOT;
      var apiurl = root + 'questions'
      var resource = this.$resource(apiurl);
      var vm = this;
      resource.update()
              .then(function(){ 
                  console.log("refresh finished!");
                  window.location.reload();
                })
              .catch(function(response){
                console.log("there are something wrong!!!");
                console.log(response);
              });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
    zoom:10%;
}
</style>
