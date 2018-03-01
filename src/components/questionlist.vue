<template>
  <div class="questionlist">
    <div class="row">
      <div class="col-md-2">
      </div>      
      <div class="col-md-1">
          <input type="text" class="form-control" placeholder="关键字" v-model='keywordFilter'>
      </div>      
      <div class="col-md-1">
          <input type="text" class="form-control" placeholder="知识点" v-model='knowledgeTagFilter'>
      </div>
      <div class="col-md-1">
          <input type="text" class="form-control" placeholder="难度" v-model='difficultyFilter'>
      </div>
      <div class="col-md-1">
          <input type="text" class="form-control" placeholder="错误原因" v-model='wrongTagFilter'>
      </div>
      <div class="col-md-1">
          <input type="text" class="form-control" placeholder="错误率" v-model='wrongRateFilter'>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2">&nbsp;</div>
    </div>
    <div class="row" v-for="(question,index) in questions">
      <div class="col-md-7" align="left">
        {{index+1}}. {{question.content}}
        <p></p>
        <img :src="question.contentImageUrl"/>
        <p></p>
        <p></p>
        <p></p>
      </div>
    </div>
    <div><span @click="getMore()">=============点击更多===============</span></div>
  </div>
</template>

<script>
export default {
  name: 'questionlist',
  data () {
    return {
      questions:[],
      knowledgeTagFilter:'',
      wrongTagFilter:'',
      difficultyFilter:'',
      keywordFilter:'',
      wrongRateFilter:'',
      count:20
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
  },
  methods:{
    getMore:function(){
      this.count += 20;
      this.getData();
    },
    getData:function(){
      var vm = this;
      var apiurl = process.env.API_ROOT + 'questions';
      var resource = vm.$resource(apiurl);

      resource.get({orderBy:"",knowledgeTagFilter:vm.knowledgeTagFilter,difficultyFilter:vm.difficultyFilter,wrongTagFilter:vm.wrongTagFilter,keywordFilter:vm.keywordFilter,wrongRateFilter:vm.wrongRateFilter,count:vm.count})
              .then((response) => {
                vm.questions = response.data.content;
                //console.log(vm.questions);
             })
              .catch(function(response) {
                console.log("there are something wrong!!!");
                console.log(response);
              })

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
