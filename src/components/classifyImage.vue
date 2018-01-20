<template>
  <div>
    <div class="row">
      <div class="col-md-2" align="right">
        <button type="button" class="btn btn-primary" @click="getData">刷新</button>
      </div>    
    </div>
    <div class="row" v-for="image in images">
      <div class="col-md-5">
        <img :src="image.imageUrl">
      </div>
      <div class="col-md-2">
        <button type="button" class="btn btn-primary">新题目</button>
      </div>
      <div class="col-md-2">
        <button type="button" class="btn btn-primary">题图片</button>
        </div>
      <div class="col-md-2">
        <button type="button" class="btn btn-primary">重做错</button>
      </div>

    </div>    
  </div>
</template>

<script>
export default {
  data () {
    return {
      images:[]
    }
  },
  mounted: function() {
    this.getData();
  },
  methods:{
    getData:function(){      
      var vm = this;
      var apiurl = process.env.API_ROOT + 'todoImages';
      var resource = vm.$resource(apiurl);
      resource.get()
              .then((response) => {
                vm.images = response.data.content;
               // console.log(vm.images);
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
