<template>
  <div class="collectquestion">
    <div class="row">
      <div class="col-md-2" align="right">
        <button type="button" class="btn btn-primary" @click="refresh">刷新</button>
      </div>
      <div class="col-md-2" align="right">
          <input type="text" class="form-control" placeholder="关键字" v-model='keywordFilter'>
      </div>      <div class="col-md-2" align="right">
          <input type="text" class="form-control" placeholder="错误原因" v-model='wrongTagFilter'>
      </div>
      <div class="col-md-2" align="right">
          <input type="text" class="form-control" placeholder="知识点" v-model='knowledgeTagFilter'>
      </div>
      <div class="col-md-2" align="right">
          <input type="text" class="form-control" placeholder="难度" v-model='difficultyFilter'>
      </div>
      <div class="col-md-1" align="right">
        <button type="button" class="btn btn-primary" @click="filter">筛选</button>
      </div>
    </div>

    <table class="table table-striped table-bordered">
      <tbody>
      <tr v-for="(question,index) in questions">
        <td>{{index+1}}</td>
        <td align="left">
          <router-link :to="{name:'questionview',params:{id:question.id,questions:questions}}">
              <img :src="question.originalImageUrl" class="img-rounded">
          </router-link>
        </td>
        <td align="left" @click="routergo(question.id)">
          {{question.content}}
        </td>
        <td align="left">
          {{question.wrongTag}}
        </td>
        <td align="left">
          {{question.knowledgeTag}}
        </td>
        <td align="left">
          {{question.difficulty}}
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
      questions:[],
      knowledgeTagFilter:'',
      wrongTagFilter:'',
      difficultyFilter:'',
      keywordFilter:''
    }
  },
  mounted: function() {
      this.knowledgeTagFilter = this.$store.state.knowledgeTagFilter;
      this.wrongTagFilter = this.$store.state.wrongTagFilter;
      this.difficultyFilter = this.$store.state.difficultyFilter;
      this.keywordFilter = this.$store.state.keywordFilter;

      this.getData();
  },
  methods:{
    filter:function(){
      var vm = this;
      vm.$store.commit('setKnowledgeTagFilter',vm.knowledgeTagFilter);
      vm.$store.commit('setWrongTagFilter',vm.wrongTagFilter);
      vm.$store.commit('setDifficultyFilter',vm.difficultyFilter);
      vm.$store.commit('setKeywordFilter',vm.keywordFilter);
      vm.getData();
    },
    getData:function(){      
      var vm = this;
      var apiurl = process.env.API_ROOT + 'questions';
      var resource = vm.$resource(apiurl);
      resource.get({orderBy:"orderByContent",knowledgeTagFilter:vm.knowledgeTagFilter,difficultyFilter:vm.difficultyFilter,wrongTagFilter:vm.wrongTagFilter,keywordFilter:vm.keywordFilter})
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
    },
    routergo: function(theid){
      var vm = this;
      this.$router.push({name: 'questionview', params: {id:theid,questions:vm.questions}});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
    zoom:30%;
}
</style>
