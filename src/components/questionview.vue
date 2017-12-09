<template>
  <div class="questionview">
    <table class="table table-striped table-bordered">
      <tbody align="left">
        <tr>
          <td @click="previous">上一题</td>
          <td>{{question.id}}</td>
          <td @click="next">下一题</td>
        </tr>
        <tr>
          <td colspan="3">
              <img :src="question.originalImageUrl" class="img-responsive">
              <img :src="question.contentImageUrl" class="img-responsive">
          </td>
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
              <div class="col-md-1">正确：</div>
              <div class="col-md-1"><button type="button" class="btn btn-default" @click="minRightTimes">-</button></div>
              <div class="col-md-1"><input type="text" class="form-control" v-model="question.rightTimes"></div>
              <div class="col-md-1"><button type="button" class="btn btn-default"  @click="addRightTimes">+</button></div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="3">
           <div class="row">
              <div class="col-md-1">错误：</div>
              <div class="col-md-1"><button type="button" class="btn btn-default" @click="minWrongTimes">-</button></div>
              <div class="col-md-1"><input type="text" class="form-control" v-model="question.wrongTimes"></div>
              <div class="col-md-1"><button type="button" class="btn btn-default" @click="addWrongTimes">+</button></div>
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
      pindex:0,
      index:0,
      nindex:0,
      question:{},
      oldKnowledgeTag:'',
      oldContent:'',
      disableUpdateKnowledgeTagButton:true,
      disableUpdateContentButton:true
    }
  },
  mounted: function() {
      this.getDataFromProps();
  },
  watch:{
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

          //console.log(vm.question);
          break;
        }
      }
    },
    previous:function(){
      var vm = this;
      if(vm.pindex == 0){
        vm.index = 0;
        vm.nindex = 1;
      }else{
        vm.index--;
        vm.pindex--;
        vm.nindex--;
      }
      vm.question = vm.questions[vm.index];
      vm.oldKnowledgeTag = vm.question.knowledgeTag;
      vm.oldContent = vm.question.content;
    },
    next:function(){
      var vm = this;
      if(vm.nindex == vm.questions.length-1){
        vm.index = vm.next;
        vm.pindex = vm.index - 1;
      }else{
        vm.index++;
        vm.pindex++;
        vm.nindex++;
      }
      vm.question = vm.questions[vm.index];
      vm.oldKnowledgeTag = vm.question.knowledgeTag;
      vm.oldContent = vm.question.content;
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
    updateWrongTimes:function(){
      var root = process.env.API_ROOT;
      var apiurl = root + 'question_wrong'
      var resource = this.$resource(apiurl);
      var vm = this;
      resource.update({id:vm.question.id},{wrongTimes:vm.question.wrongTimes})
              .then(function(){ 
                  console.log("updateWrongTimes: success!");
                })
              .catch(function(response){
                console.log("updateWrongTimes: there are something wrong!!!");
                console.log(response);
              });
    },
    addWrongTimes:function(){
      this.question.wrongTimes = parseInt(this.question.wrongTimes) + 1;
      this.updateWrongTimes();
    },
    minWrongTimes:function(){
      this.question.wrongTimes = parseInt(this.question.wrongTimes) - 1;
      this.updateWrongTimes();
    }  
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
