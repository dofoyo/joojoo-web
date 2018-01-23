<template>
  <div class="collectquestion">
    <div class="row">
      <div class="col-md-2" align="right">
        <button type="button" class="btn btn-primary" @click="refresh">刷新</button>
      </div>    
    </div>

    <table class="table table-striped table-bordered">
      <thead>
        <tr align="center">
          <td>序号</td>
          <td>题目<br>
                <input type="text" class="form-control" placeholder="关键字" v-model='keywordFilter'>
          </td>
          <td>知识点<br>
          <select v-model="knowledgeTagFilter">
                <option value=""></option>  
                <option v-for="item in knowledgeTags" v-bind:value="item.name">{{item.name}}</option>  
            </select>  
          </td>
          <td>难度<br>
          <select v-model="difficultyFilter">
                <option value=""></option>  
                <option v-for="item in difficulty" v-bind:value="item.name">{{item.name}}</option>  
            </select>  
          </td>
          <td>错误原因<br>
          <select v-model="wrongTagFilter">
                <option value=""></option>  
                <option v-for="item in wrongTags" v-bind:value="item.name">{{item.name}}</option>  
            </select>  
          </td>
          <td>错误率<br>
          <select v-model="wrongRateFilter">
                <option value=""></option>  
                <option v-for="item in wrongRate" v-bind:value="item.name">{{item.name}}</option>  
            </select>  
          </td>
        </tr>
      </thead>
      <tbody>
      <tr v-for="(question,index) in questions">
        <td>{{index+1}}</td>
        <td align="left" @click="routergo(question.id)">
          {{question.content}}
        </td>
        <td align="left">
          {{question.knowledgeTag}}
        </td>
        <td align="left">
          {{question.difficulty}}
        </td>
        <td align="left">
          {{question.wrongTag}}
        </td>
        <td align="left">
          {{question.wrongRate}}
        </td>
      </tr>
      </tbody>
    </table>
    <div><span @click="getMore()">=============点击更多===============</span></div>
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
      keywordFilter:'',
      wrongRateFilter:'',
      count:3000,
      wrongTags:[],
      wrongRate:[],
      knowledgeTags:[],
      difficulty:[]
    }
  },
  watch:{
    'knowledgeTagFilter':{
      handler: function(val, oldval){
        var vm = this;
        vm.$store.commit('setKnowledgeTagFilter',val);
        vm.getData();
      }
    },
    'wrongRateFilter':{
      handler: function(val, oldval){
        var vm = this;
        vm.$store.commit('setWrongRateFilter',val);
        vm.getData();
      }
    },
    'wrongTagFilter':{
      handler: function(val, oldval){
        var vm = this;
        vm.$store.commit('setWrongTagFilter',val);
        vm.getData();
      }
    },
    'keywordFilter':{
      handler: function(val, oldval){
        var vm = this;
        vm.$store.commit('setKeywordFilter',val);
        vm.getData();
      }
    },
    'difficultyFilter':{
      handler: function(val, oldval){
        var vm = this;
        vm.$store.commit('setDifficultyFilter',val);
        vm.getData();
      }
    }
  },
  mounted: function() {
    this.knowledgeTagFilter = this.$store.state.knowledgeTagFilter;
    this.wrongTagFilter = this.$store.state.wrongTagFilter;
    this.wrongRateFilter = this.$store.state.wrongRateFilter;
    this.difficultyFilter = this.$store.state.difficultyFilter;
    this.keywordFilter = this.$store.state.keywordFilter;
    this.getData();
    this.getWrongTags();
    this.getWrongRate();
    this.getKnowledgeTags();
    this.getDifficulty();
  },
  methods:{
    getWrongRate:function(){
      var vm = this;
      var apiurl = process.env.API_ROOT + 'wrongRate';
      var resource = vm.$resource(apiurl);
      resource.get()
              .then((response) => {
                vm.wrongRate = response.data.content;
                //console.log(vm.wrongRate);
             })
              .catch(function(response) {
                console.log("there are something wrong!!!");
                console.log(response);
              })

    },
    getKnowledgeTags:function(){
      var vm = this;
      var apiurl = process.env.API_ROOT + 'knowledgeTags';
      var resource = vm.$resource(apiurl);
      resource.get()
              .then((response) => {
                vm.knowledgeTags = response.data.content;
                //console.log(vm.knowledgeTags);
             })
              .catch(function(response) {
                console.log("there are something wrong!!!");
                console.log(response);
              })
    },
    getDifficulty:function(){
      var vm = this;
      var apiurl = process.env.API_ROOT + 'difficulty';
      var resource = vm.$resource(apiurl);

      resource.get({wrongRateFilter:vm.wrongRateFilter})
              .then((response) => {
                vm.difficulty = response.data.content;
                //console.log(vm.wrongRate);
             })
              .catch(function(response) {
                console.log("there are something wrong!!!");
                console.log(response);
              })
    },
    getWrongTags:function(){
      var vm = this;
      var apiurl = process.env.API_ROOT + 'wrongTags';
      var resource = vm.$resource(apiurl);

      resource.get()
              .then((response) => {
                vm.wrongTags = response.data.content;
                //console.log(vm.wrongTags);
             })
              .catch(function(response) {
                console.log("there are something wrong!!!");
                console.log(response);
              })
    },
    getMore:function(){
      this.count += 20;
      this.getData();
    },
    getData:function(){      
      var vm = this;
      var apiurl = process.env.API_ROOT + 'questions';
      var resource = vm.$resource(apiurl);
      resource.get({orderBy:"orderByContent",knowledgeTagFilter:vm.knowledgeTagFilter,difficultyFilter:vm.difficultyFilter,wrongTagFilter:vm.wrongTagFilter,keywordFilter:vm.keywordFilter,wrongRateFilter:vm.wrongRateFilter,count:vm.count})
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
