<template>
  <div class="questionview">
    <table class="table table-striped table-bordered" border="1">
      <tbody align="left">
        <tr>
          <td @click="previous">上一题</td>
          <td>{{question.id}}</td>
          <td @click="next">下一题</td>
        </tr>
        <tr>
          <td>
            <textarea class="form-control" rows="3" v-model="question.content"></textarea>
            <button type="button" id="updateContent" class="btn btn-primary btn-lg btn-block" @click="updateContent" :disabled="disableUpdateContentButton">{{updateContentMsg}}</button>
          </td>
          <td>
            <textarea class="form-control" rows="3" v-model="question.knowledgeTag"></textarea>
            <button type="button" id="updateKnowledgeTag" class="btn btn-primary btn-lg btn-block" @click="updateKnowledgeTag" :disabled="disableUpdateKnowledgeTagButton">{{updateKnowledgeTagMsg}}</button>
          </td>
          <td>
            <textarea class="form-control" rows="3" v-model="question.wrongTag"></textarea>
            <button type="button" id="updateWrongTag" class="btn btn-primary btn-lg btn-block" @click="updateWrongTag" :disabled="disableUpdateWrongTagButton">{{updateWrongTagMsg}}</button>
          </td>
        </tr>
        <tr>
          <td>
            难度：
            <button type="button" class="btn btn-default btn-lg"  v-for="star in stars">
                 <span class="glyphicon glyphicon-star glyphicon-lg" 
                        :style="star.value<=question.difficulty ? 'color:red' : 'color:#CCCCCC'" 
                        @click="setDifficulty(star.value)"></span>
            </button>
          </td>
          <td rowspan="3"></td>
          <td rowspan="3">
            <div  class="btn-group" role="group">
                <button type="button" 
                        class="btn btn-default" 
                        v-for="wrongtag in wrongTags"
                        @click="selectWrongtag(wrongtag.name)">
                    {{wrongtag.name}}
                </button>&nbsp;&nbsp;
            </div>
          </td>
        </tr>
        <tr>
          <td>
            正确：
            <button type="button" class="btn btn-default btn-lg"  v-for="star in stars">
                 <span class="glyphicon glyphicon-ok glyphicon-lg" 
                        :style="star.value<question.rightTimes ? 'color:green' : 'color:#CCCCCC'" 
                        @click="setRightTimes(star.value+1)"></span>
            </button>              
          </td>
        </tr>
        <tr>
          <td>错误：{{question.wrongTimes}}</td>
        </tr>
        <tr>
          <td colspan="3">
              <img :src="question.originalImageUrl" class="img-responsive">
          </td>
        </tr>  
        <tr>
          <td colspan="3">
           <div class="row" v-for="wrongImageUrl in question.worngImageUrls">
               <div class="col-md-9">
                   <img :src="wrongImageUrl" class="img-responsive">
                </div>
            </div>
          </td>
        </tr>       
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'questionview',
  props: {
      id:'',
      questions:{}
  },
  data () {
    return {
      stars:[{value:0},{value:1},{value:2},{value:3},{value:4}],
      updateContentMsg:'题目',
      updateKnowledgeTagMsg:'知识点',
      updateWrongTagMsg:'错误原因',
      //pindex:0,
      index:0,
      //nindex:0,
      question:{},
      wrongTags:[],
      oldKnowledgeTag:'',
      oldContent:'',
      oldWrongTag:'',
      disableUpdateKnowledgeTagButton:true,
      disableUpdateWrongTagButton:true,
      disableUpdateContentButton:true
    }
  },
  mounted: function() {
      this.getDataFromProps();
      this.getWrongTags();
  },
  watch:{
    'question.wrongTag': {
      handler: function(val, oldval){
        var vm = this;
        if(vm.oldWrongTag != val){
          vm.disableUpdateWrongTagButton = false;
          vm.updateWrongTagMsg = '保存';
        }else{
          vm.disableUpdateWrongTagButton = true;
          vm.updateWrongTagMsg = '错误原因';
        }
      },
      deep:true
    },
    'question.knowledgeTag': {
      handler: function(val, oldval){
        var vm = this;
        if(vm.oldKnowledgeTag != val){
          vm.disableUpdateKnowledgeTagButton = false;
          vm.updateKnowledgeTagMsg = '保存';
        }else{
          vm.disableUpdateKnowledgeTagButton = true;
          vm.updateKnowledgeTagMsg = '知识点';
        }
      },
      deep:true
    },
    'question.content':{
      handler: function(val, oldval){
        var vm = this;
        if(vm.oldContent != val){
          vm.disableUpdateContentButton = false;
          vm.updateContentMsg = '保存';
        }else{
          vm.disableUpdateContentButton = true;
          vm.updateContentMsg = '题目';
        }
      },
      deep:true
    }
  },
  methods:{
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
    selectWrongtag:function(tag){
      var vm = this;
      if(vm.question.wrongTag == null){
        vm.question.wrongTag = tag;        
      }else{
        vm.question.wrongTag += " " + tag;        
      }
      //vm.updateWrongTag();

    },
    getDataFromProps:function(){
      var vm = this;
      //console.log(vm.questions);
      for (var i = 0; i < vm.questions.length; i++) {
        if(vm.id == vm.questions[i].id){
          vm.index = i;
          vm.question = vm.questions[i];
          vm.oldKnowledgeTag = vm.question.knowledgeTag;
          vm.oldContent = vm.question.content;
          vm.oldWrongTag = vm.question.wrongTag;
          break;
        }
      }
    },
    previous:function(){
      var vm = this;
      if(vm.index >0){
        vm.index--;
        vm.question = vm.questions[vm.index];
        vm.oldKnowledgeTag = vm.question.knowledgeTag;
        vm.oldContent = vm.question.content;        
        vm.oldWrongTag = vm.question.wrongTag;
      }
    },
    next:function(){
      var vm = this;
      if(vm.index < vm.questions.length-1){
        vm.index++;
        vm.question = vm.questions[vm.index];
        vm.oldKnowledgeTag = vm.question.knowledgeTag;
        vm.oldContent = vm.question.content;          
        vm.oldWrongTag = vm.question.wrongTag;
      }
    },
    getDataFromApi:function(){   // 无用，仅供参考 
      var vm = this;
      var apiurl = process.env.API_ROOT + 'question';
      var resource = vm.$resource(apiurl);

      //console.log(vm.id);

      resource.get({id:vm.id})
              .then((response) => {
                vm.question = response.data.content;
                //console.log(response);
                //console.log(vm.question);
             })
              .catch(function(response) {
                console.log("getData:there are something wrong!!!");
                console.log(response);
              })
    },
    updateContent:function(){
      var vm = this;
      vm.disableUpdateContentButton = true;
      vm.msg = "正在保存......";
      var root = process.env.API_ROOT;
      var apiurl = root + 'question_content'
      var resource = vm.$resource(apiurl);
      resource.update({id:vm.question.id},{content:vm.question.content})
              .then(function(){ 
                  console.log("updateContent: success!");
                  vm.msg = "保存";
                  vm.oldContent = vm.question.content;
                })
              .catch(function(response){
                console.log("updateContent: there are something wrong!!!");
                console.log(response);
              });
    },
    updateWrongTag:function(){
      var vm = this;
      vm.disableUpdateWrongTagButton = true;
      vm.msg = "正在保存......";
      var root = process.env.API_ROOT;
      var apiurl = root + 'question_wrongTag'
      var resource = vm.$resource(apiurl);
      resource.update({id:vm.question.id},{wrongTag:vm.question.wrongTag})
              .then(function(){ 
                  console.log("updateWrongTag: success!");
                  vm.msg = "保存";
                  vm.oldWrongTag = vm.question.wrongTag;
                })
              .catch(function(response){
                console.log("updateWrongTag: there are something wrong!!!");
                console.log(response);
              });
    },
    updateKnowledgeTag:function(){
      var vm = this;
      vm.disableUpdateKnowledgeTagButton = true;
      vm.msg = "正在保存......";
      var root = process.env.API_ROOT;
      var apiurl = root + 'question_knowledgeTag'
      var resource = vm.$resource(apiurl);
      resource.update({id:vm.question.id},{knowledgeTag:vm.question.knowledgeTag})
              .then(function(){ 
                  console.log("updateKnowledgeTag: success!");
                  vm.msg = "保存";
                  vm.oldKnowledgeTag = vm.question.knowledgeTag;
                })
              .catch(function(response){
                console.log("updateKnowledgeTag: there are something wrong!!!");
                console.log(response);
              });
    },
    updateRightTimes:function(){
      var root = process.env.API_ROOT;
      var apiurl = root + 'question_right'
      var resource = this.$resource(apiurl);
      var vm = this;
      resource.update({id:vm.question.id},{rightTimes:vm.question.rightTimes})
              .then(function(){ 
                  console.log("updateRightTimes: success!");
                })
              .catch(function(response){
                console.log("updateRightTimes: there are something wrong!!!");
                console.log(response);
              });
    },
    updateDifficulty:function(){
      var root = process.env.API_ROOT;
      var apiurl = root + 'question_difficulty'
      var resource = this.$resource(apiurl);
      var vm = this;
      resource.update({id:vm.question.id},{difficulty:vm.question.difficulty})
              .then(function(){ 
                  console.log("update difficulty: success!");
                })
              .catch(function(response){
                console.log("update difficulty: there are something wrong!!!");
                console.log(response);
              });
    },
    setDifficulty:function(val){
      if(val == this.question.difficulty){
        this.question.difficulty -= 1;
      }else{
        this.question.difficulty = val;
      }
      //console.log(val);
      this.updateDifficulty();      
    },
    setRightTimes:function(val){
      if(val == this.question.rightTimes){
        this.question.rightTimes -= 1;        
      }else{
        this.question.rightTimes = val;        
      }
      //console.log(val);
      this.updateRightTimes();      
    }  
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
