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
          <td colspan="2">
            <textarea class="form-control" rows="3" v-model="question.content"></textarea>
            <button type="button" id="updateContent" class="btn btn-primary btn-lg btn-block" @click="updateContent" :disabled="disableUpdateContentButton">{{msg}}</button>
          </td>
          <td>
            <textarea class="form-control" rows="3" v-model="question.knowledgeTag"></textarea>
            <button type="button" id="updateKnowledgeTag" class="btn btn-primary btn-lg btn-block" @click="updateKnowledgeTag" :disabled="disableUpdateKnowledgeTagButton">{{msg}}</button>
          </td>
        </tr>
        <tr>
          <td colspan="3">
           <div class="row">
              <div class="col-md-1">难度：</div>
              <div class="col-md-1"><button type="button" class="btn btn-default" @click="minDifficulty">-</button></div>
              <div class="col-md-1"><input type="text" class="form-control" v-model="question.difficulty"></div>
              <div class="col-md-1"><button type="button" class="btn btn-default"  @click="addDifficulty">+</button></div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="3">
              <img :src="question.originalImageUrl" class="img-responsive">
              <img :src="question.contentImageUrl" class="img-responsive">
          </td>
        </tr>  
        <tr>
          <td colspan="3">
           <div class="row">
              <div class="col-md-1">正确：</div>
              <div class="col-md-1"><button type="button" class="btn btn-default" @click="minRightTimes">-</button></div>
              <div class="col-md-1"><input type="text" class="form-control" v-model="question.rightTimes"></div>
              <div class="col-md-1"><button type="button" class="btn btn-default"  @click="addRightTimes">+</button></div>
            </div>
          </td>
        </tr>
        <tr>
          <td>错误：{{question.wrongTimes}}</td>
          <td colspan="2">
              <div class="row">
                <div class="col-lg-8">
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="错误原因" v-model='question.wrongTag'>
                    <span class="input-group-btn">
                      <button class="btn btn-default" type="button" id="updateWrongTag" @click="updateWrongTag" :disabled="disableUpdateWrongTagButton">{{msg}}</button>
                    </span>
                  </div>
                </div>
              </div>
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
      msg: '保存',
      //pindex:0,
      index:0,
      //nindex:0,
      question:{},
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
  },
  watch:{
    'question.wrongTag': {
      handler: function(val, oldval){
        var vm = this;
        if(vm.oldWrongTag != val){
          vm.disableUpdateWrongTagButton = false;
        }else{
          vm.disableUpdateWrongTagButton = true;
        }
      },
      deep:true
    },
    'question.knowledgeTag': {
      handler: function(val, oldval){
        var vm = this;
        if(vm.oldKnowledgeTag != val){
          vm.disableUpdateKnowledgeTagButton = false;
        }else{
          vm.disableUpdateKnowledgeTagButton = true;
        }
      },
      deep:true
    },
    'question.content':{
      handler: function(val, oldval){
        var vm = this;
        if(vm.oldContent != val){
          vm.disableUpdateContentButton = false;
        }else{
          vm.disableUpdateContentButton = true;
        }
      },
      deep:true
    }
  },
  methods:{
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
          /*
          if(vm.index == 0){
            vm.pindex = vm.index;
            vm.nindex = vm.index + 1;
          }else if(vm.index == vm.questions.length-1){
            vm.nindex = vm.index;
            vm.pindex = vm.index - 1; 
          }else{
            vm.pindex = vm.index - 1;
            vm.nindex = vm.index + 1;
          }
          */

          //console.log(vm.question);
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
    addRightTimes:function(){
      this.question.rightTimes = parseInt(this.question.rightTimes) + 1;
      this.updateRightTimes();
    },
    minRightTimes:function(){
      this.question.rightTimes = parseInt(this.question.rightTimes) - 1;
      this.updateRightTimes();
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
    addDifficulty:function(){
      this.question.difficulty = parseInt(this.question.difficulty) + 1;
      this.updateDifficulty();
    },
    minDifficulty:function(){
      this.question.difficulty = parseInt(this.question.difficulty) - 1;
      this.updateDifficulty();
    }  
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
