<template>
  <div id="app">
    <el-input v-model="imagenameFilter" placeholder="按名称筛选"></el-input>
    <el-table :data="images">
      <el-table-column label="图片">
        <template slot-scope="scope">
          <el-tag>{{scope.row.name}}</el-tag><br>
          <img :src="scope.row.url">
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
            <span>{{scope.row.content}}</span><br>
            <el-button type="primary" v-if="scope.row.type===-1" icon="el-icon-document"
              @click="newQuestion(scope.row.name)">新做错</el-button>

            <el-button type="primary" v-if="scope.row.type===-1"  icon="el-icon-error"
              @click="reQuestion(scope.row.name)">重做错</el-button>

            <el-button type="primary" v-if="scope.row.type===-1"  icon="el-icon-picture"
              @click="contentImage(scope.row.name)">题图片</el-button>  

            <el-button type="danger" v-if="scope.row.type===0" icon="el-icon-refresh"
              @click="cancel(scope.row.name)">定义为题图片，点击取消</el-button>

            <el-button type="danger" v-if="scope.row.type===1"  icon="el-icon-refresh"
              @click="cancel(scope.row.name)">定义为错题，点击取消</el-button>

        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="选择题目" :visible.sync="dialogTableVisible" @close="doClose">
      <el-input v-model="keywordFilter" placeholder="按关键字筛选"></el-input>
      <el-table :data="questions">
        <el-table-column label="" width="50px">
            <template slot-scope="scope">
               <el-checkbox @change="handleSelectionChange(scope.row.id)"></el-checkbox>
            </template>
        </el-table-column>
        <el-table-column label="">
            <template slot-scope="scope">
               <P>{{scope.row.content}}</P>
               <div class="row" v-for="wrongImageUrl in scope.row.worngImageUrls">
                 <div class="col-md-9">
                     <img :src="wrongImageUrl" class="img-responsive">
                  </div>
              </div>
            </template>  
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogTableVisible: false,
        images:[],
        questions:[],
        count:20,
        selectedImageName:'',
        selectedQuestionId:'',
        selectedType:-100,
        keywordFilter:'',
        imagenameFilter:''
      };
    },
    mounted: function() {
      this.getImages();
    },
    watch:{
      'keywordFilter':{
        handler: function(val, oldval){
          this.getQuestions();
        }
      },
      'imagenameFilter':{
        handler: function(val, oldval){
          this.getImages();
        }
      }
    },
    methods:{
      getImages:function(){      
      var vm = this;
      var apiurl = process.env.API_ROOT + 'images';
      var resource = vm.$resource(apiurl);
      resource.get({count:vm.count,imagenameFilter:vm.imagenameFilter})
              .then((response) => {
                vm.images = response.data.content;
                //console.log(vm.images);
             })
              .catch(function(response) {
                console.log("there are something wrong!!!");
                console.log(response);
              })

      },
      setImageToQuestion:function(){
        var vm = this;
        var apiurl = process.env.API_ROOT + 'reQuestion'
        var resource = this.$resource(apiurl);
        resource.update({questionid:vm.selectedQuestionId,imagename:vm.selectedImageName,type:vm.selectedType})
                .then(function(){ 
                    //console.log("newQuestion: success!");
                    this.setImages(vm.selectedImageName,vm.selectedType);
                  })
                .catch(function(response){
                  console.log("newQuestion: there are something wrong!!!");
                  console.log(response);
                });
      },
      newQuestion:function(val){
        //console.log(val);
        var apiurl = process.env.API_ROOT + 'newQuestion'
        var resource = this.$resource(apiurl);
        resource.update({imagename:val})
                .then(function(){ 
                    //console.log("newQuestion: success!");
                    this.setImages(val,1);
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
                    this.setImages(val,-1);
                    this.$message({
                        type: 'success',
                        message: '取消成功!'
                      });
                                
                    //console.log("newQuestion: success!");
                  })
                .catch(function(response){
                  console.log("newQuestion: there are something wrong!!!");
                  console.log(response);
                });
      },
      setImages:function(imagename,type){
        //console.log(this.images.length)
        for(var i=0; i<this.images.length; i++){
          var image = this.images[i];
          if(image.name===imagename){
            image.type=type;
            break;
          }
        }
      },
      cancel(val) {
        this.$confirm('此操作将永久取消该图片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doCancel(val);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
      },
      getQuestions:function(){
        var vm = this;
        var apiurl = process.env.API_ROOT + 'questions';
        var resource = vm.$resource(apiurl);
        resource.get({count:vm.count,keywordFilter:vm.keywordFilter})
                .then((response) => {
                  vm.questions = response.data.content;
                  //console.log(vm.questions);
               })
                .catch(function(response) {
                  console.log("getQuestions:there are something wrong!!!");
                  console.log("keywordFilter: " + vm.keywordFilter);
                  console.log(response);
                })

      },
      reQuestion:function(val){
        this.dialogTableVisible=true;
        this.selectedImageName = val;
        this.selectedType = 1;
        this.getQuestions();
      },
      contentImage:function(val){
        this.dialogTableVisible=true;
        this.selectedImageName = val;
        this.selectedType = 0;
        this.getQuestions();
      },
      handleSelectionChange:function(val){
        //console.log(item);
        this.selectedQuestionId = val;
        this.dialogTableVisible=false;
        this.setImageToQuestion();
      },
      doClose:function(){
        this.questions = null;
      }
    }
  };
</script>

<style>
img {
    zoom:80%;
}
</style>
