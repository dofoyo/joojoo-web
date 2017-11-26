<template>
  <div class="questionview">
    <table class="table table-striped table-bordered">
      <tbody align="left">
        <tr>
          <td>
              <img :src="question.originalImageUrl" class="img-rounded">
          </td>
        </tr>  
        <tr>
          <td>
            <textarea class="form-control" rows="3" v-model="question.content"></textarea>
            <br>
            <img :src="question.contentImageUrl">
            <br>
            <button type="button" class="btn btn-primary btn-lg btn-block" @click="updateContent">{{msg}}</button>
          </td>
        </tr>
        <tr>
          <td>
           <div class="row">
              <div class="col-md-1">正确：</div>
              <div class="col-md-1"><button type="button" class="btn btn-default" @click="minRightTimes">-</button></div>
              <div class="col-md-1"><input type="text" class="form-control" v-model="question.rightTimes"></div>
              <div class="col-md-1"><button type="button" class="btn btn-default"  @click="addRightTimes">+</button></div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
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
        id:''
  },
  data () {
    return {
      msg: '保存',
      question:{}
    }
  },
  mounted: function() {
      this.getData();
  },
  methods:{
    getData:function(){

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
      this.msg = "正在保存......";
      var root = process.env.API_ROOT;
      var apiurl = root + 'question_content'
      var resource = this.$resource(apiurl);
      var vm = this;
      resource.update({id:vm.question.id},{content:vm.question.content})
              .then(function(){ 
                  console.log("updateContent: success!");
                  this.msg = "保存";
                })
              .catch(function(response){
                console.log("updateRightTimes: there are something wrong!!!");
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
