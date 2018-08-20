<template>
  <div class="questionlist2">
    <div class="row">
      <div class="col-md-2">&nbsp;</div>
    </div>
    <div class="row" v-for="(knowledge,index) in knowledges" :key="index">
      <div class="col-md-11">
      <div align="left">{{index+1}}.{{knowledge.knowledgeID}}-{{knowledge.knowledgeName}} </div>
      <div align="left" v-for="(question,cindex) in knowledge.questions" :key="knowledge.index">
        <div @click="view(question.id)">{{index+1}}-{{cindex+1}}. {{question.content}}</div>
        <div v-if="question.contentImageUrl!=''"><img :src="question.contentImageUrl"/></div>
        <div>
          <el-popover
              placement="right"
              trigger="click">
              <div v-for="wrong in question.wrongs">
                 <img :src="wrong.imageUrl" class="img-responsive">
              </div>
              <el-button slot="reference">...</el-button>
            </el-popover>
        </div>
      </div>
      <p>-----------</p>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'questionlist2',
  data () {
    return {
      knowledges:[],
      gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
    }
  },
  mounted: function() {
    this.getData();
  },
  methods:{
    getData:function(){
      var vm = this;
      var apiurl = process.env.API_ROOT + 'questionsbyknowledge';
      var resource = vm.$resource(apiurl);
      resource.get()
              .then((response) => {
                vm.knowledges = response.data.content;
                //console.log(vm.knowledges);
             })
              .catch(function(response) {
                console.log("there are something wrong!!!");
                console.log(response);
              })

    },
    view: function(theid){
      var vm = this;
      console.log("view " + theid);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
