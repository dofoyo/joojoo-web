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
          <td width="400px">
            <textarea class="form-control" rows="3" v-model="question.knowledgeTag"></textarea>
            <button type="button" id="updateKnowledgeTag" class="btn btn-primary btn-lg btn-block" @click="updateKnowledgeTag" :disabled="disableUpdateKnowledgeTagButton">{{updateKnowledgeTagMsg}}</button>
          </td>
          <td width="660px">
            <textarea class="form-control" rows="3" v-model="question.wrongTag"></textarea>
            <button type="button" id="updateWrongTag" class="btn btn-primary btn-lg btn-block" @click="updateWrongTag" :disabled="disableUpdateWrongTagButton">{{updateWrongTagMsg}}</button>
          </td>
        </tr>
        <tr>
          <td rowspan="3" align="center">
           <img :src="question.contentImageUrl" class="img-responsive"><br>
          <h3>
              <span class="glyphicon glyphicon-folder-open" aria-hidden="true" @click="doSelect" v-if="question.contentImageUrl ==''"></span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span class="glyphicon glyphicon-picture" aria-hidden="true" @click="dialogTableVisible=true" v-if="question.contentImageUrl ==''"></span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span class="glyphicon glyphicon-share-alt" aria-hidden="true" @click="removeContentImage" v-if="question.contentImageUrl !=''"></span>
            </h3>
          </td>
          <td>
             难度：
            <button type="button" class="btn btn-default btn-lg"  v-for="star in stars">
                 <span class="glyphicon glyphicon-star glyphicon-lg" 
                        :style="star.value<=question.difficulty ? 'color:red' : 'color:#CCCCCC'" 
                        @click="setDifficulty(star.value)"></span>
            </button>
          </td>
          <td rowspan="3">
            <div class="btn-group" role="group">
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
           <div class="row" v-for="wrongImageUrl in question.worngImageUrls">
               <div class="col-md-9">
                   <img :src="wrongImageUrl" class="img-responsive"><p>{{wrongImageUrl}}</p>
                </div>
            </div>
          </td>
        </tr>       
      </tbody>
    </table>

    <div v-show="false">
      <input type="file" id="selectImage" name="selectImage" accept="image/jpg,image/jpeg,image/png,image/gif" v-on:change="upload">
    </div>

    <el-dialog title="选择图片" :visible.sync="dialogTableVisible" @close="doClose" @open="getImages">
      <el-input v-model="imagenameFilter" placeholder="按图片名筛选"></el-input>
      <el-table :data="images">
        <el-table-column label="" width="50px">
            <template slot-scope="scope">
               <el-checkbox @change="setImageToQuestion(scope.row.name,scope.row.url)"></el-checkbox>
            </template>
        </el-table-column>
        <el-table-column label="">
            <template slot-scope="scope">
                <img :src="scope.row.url" class="img-responsive">
                <span>{{scope.row.content}}</span>
            </template>  
        </el-table-column>
      </el-table>
    </el-dialog>
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
      imagenameFilter:'',
      images:[],
      dialogTableVisible: false,
      stars:[{value:0},{value:1},{value:2},{value:3},{value:4}],
      updateContentMsg:'题目',
      updateKnowledgeTagMsg:'知识点',
      updateWrongTagMsg:'错误原因',
      fileList: [],
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
    getImages:function(){      
      var vm = this;
      var apiurl = process.env.API_ROOT + 'images';
      var resource = vm.$resource(apiurl);
      resource.get({count:vm.count,imagenameFilter:vm.imagenameFilter,typeFilter:-1})
              .then((response) => {
                vm.images = response.data.content;
                //console.log(vm.images);
             })
              .catch(function(response) {
                console.log("there are something wrong!!!");
                console.log(response);
              })

    },
    removeContentImage:function(){
       if(this.question.contentImageUrl != ''){
         this.$confirm('取消该图片, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '放弃',
            type: 'warning'
          }).then(() => {
            this.doCancel(this.question.contentImage);
          }).catch(()=>{});        
        }
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
                  //console.log("updateContent: success!");
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
                  //console.log("updateWrongTag: success!");
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
                  //console.log("updateKnowledgeTag: success!");
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
                  //console.log("updateRightTimes: success!");
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
                  //console.log("update difficulty: success!");
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
    },
    doClose:function(){
      this.images = null;
    },
    setImageToQuestion:function(val,url){
      var vm = this;
      vm.dialogTableVisible=false;
      var apiurl = process.env.API_ROOT + 'reQuestion'
      var resource = this.$resource(apiurl);
      resource.update({questionid:vm.question.id,imagename:val,type:0})
              .then(function(){ 
                  vm.question.contentImage = val;
                  vm.question.contentImageUrl = url;
                  //console.log("newQuestion: success!");
                  //this.setImages(vm.selectedImageName,vm.selectedType);
                })
              .catch(function(response){
                console.log("newQuestion: there are something wrong!!!");
                console.log(response);
              });
    },
    doCancel:function(val){
      //console.log(val);
      var apiurl = process.env.API_ROOT + 'cancel'
      var resource = this.$resource(apiurl);
      resource.update({imagename:val})
              .then(function(){ 
                  this.question.contentImage = "";
                  this.question.contentImageUrl = '';
                  //console.log("doCancel: success!");
                })
              .catch(function(response){
                console.log("newQuestion: there are something wrong!!!");
                console.log(response);
              });
    },
    upload:function (e) {
          var vm = this;
          var apiurl = process.env.API_ROOT + 'image';
          //e.preventDefault();
          vm.image = e.target.files[0];
          //console.log(vm.image);
          let supportedTypes = ['image/jpg','image/jpeg', 'image/gif', 'image/png'];
          if (vm.image && supportedTypes.indexOf(vm.image.type) >= 0) {
              let formData = new FormData();
              formData.append('image', vm.image);
              formData.append('questionid',vm.question.id);
              let config = {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
              }
              this.$http.post(apiurl, formData, config).then(function (res) {
                //console.log(res);
                if(res.status===200 && res.body.msg==='2'){
                  vm.question.contentImageUrl = res.body.content;
                }else{
                  vm.question.contentImageUrl = '';
                }
            })

          } else {
              alert('文件格式只支持：jpg、jpeg、gif 和 png');
          }
      },
      doSelect:function(){
        var button = document.getElementById("selectImage");
        button.click();
      }
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
