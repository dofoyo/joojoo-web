<template>
  <div>
    <div class="row">
      <div class="col-md-2" align="right">
        <button type="button" class="btn btn-primary" @click="getData">刷新</button>
      </div>    
    </div>

    <table>
    <tr v-for="image in images">
      <td>
          <img :src="image.url">
          <p>{{image.name}}</p>
      </td>
      <td>
          <div v-if="image.type===-1">
            <button type="button" class="btn btn-primary" @click="newQuestion(image.name)">
                新做错
            </button>
            <button type="button" class="btn btn-primary" @click="reQuestion(image.name)">
                重做错
            </button>
            <button type="button" class="btn btn-primary" @click="contentImage(image.name)">
                题图片
            </button>
          </div>
          <div v-else>
            <button type="button" class="btn btn-primary" v-if="image.type===0" @click="cancel(image.name)">
                定义为题图片，点击取消
            </button>
            <button type="button" class="btn btn-danger" v-if="image.type===1" @click="cancel(image.name)">
                定义为错题，点击取消
            </button>
            <h5>{{image.content}}</h5>
          </div>
      </td>
    </tr>
    </table>
    <div><span @click="getMore()">=============点击更多===============</span></div>

  </div>
</template>

<script>
export default {
  
  data () {
    return {
      images:[],
      count:20,
      isShow:false

    }
  },
  mounted: function() {
    this.getData();
  },
  methods:{
    close:function(){
      this.isShow = false;
    },
    getMore:function(){
      this.count += 20;
      this.getData();
    },
    getData:function(){      
      var vm = this;
      var apiurl = process.env.API_ROOT + 'todoImages';
      var resource = vm.$resource(apiurl);
      resource.get({count:vm.count})
              .then((response) => {
                vm.images = response.data.content;
                //console.log(vm.images);
             })
              .catch(function(response) {
                console.log("there are something wrong!!!");
                console.log(response);
              })

    },
    newQuestion:function(val){
      //console.log(val);
      var root = process.env.API_ROOT;
      var apiurl = root + 'newQuestion'
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
    reQuestion:function(val){
      //console.log(val);
      var vm = this;
      vm.isShow = true;
/*      var root = process.env.API_ROOT;
      var apiurl = root + 'reQuestion'
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
*/    },
    contentImage:function(val){
      //console.log(val);
      var vm = this;
      vm.isShow = true;
/*      var root = process.env.API_ROOT;
      var apiurl = root + 'contentImage'
      var resource = vm.$resource(apiurl);
      resource.update({imagename:val})
              .then(function(){ 
                  //console.log("newQuestion: success!");
                  vm.setImages(val,0);
                })
              .catch(function(response){
                console.log("newQuestion: there are something wrong!!!");
                console.log(response);
              });*/
    },
    cancel:function(val){
      //console.log(val);
      var root = process.env.API_ROOT;
      var apiurl = root + 'cancel'
      var resource = this.$resource(apiurl);
      resource.update({imagename:val})
              .then(function(){ 
                  this.setImages(val,-1);
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
