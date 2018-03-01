<template>
    <div id="app">
        <div class="row">
            <div class="col-md-4">
                <div class="block">
                    <el-slider v-model="threshold" show-input></el-slider>
                </div>
             </div>
        </div>
        <schart :canvasId="canvasId"
            :type="type"
            :width="width"
            :height="height"
            :data="wrongTags"
            :options="options"
        ></schart>
    </div>
</template>
<script>
import Schart from 'vue-schart';
export default {
    data() {
        return {
            canvasId: 'myCanvas',
            type: 'bar',
            width: 1600,
            height: 400,
            demodata: [
                {name: '2014', value: 1342},
                {name: '2015', value: 2123},
                {name: '2016', value: 1654},
                {name: '2017', value: 1795},
            ],
            options: {
                title: ''
            },
            wrongTags:[],
            threshold:100
        }
    },
    components:{
        Schart
    },
    mounted: function() {
      this.getData();
    },
    watch:{
      'threshold':{
        handler: function(val, oldval){
          this.getData();
        }
      }
    },
    methods:{
    getData:function(){

      var vm = this;
      var apiurl = process.env.API_ROOT + 'wrongTags';
      var resource = vm.$resource(apiurl);
      var d = vm.threshold / 100;
      resource.get({threshold:d})
              .then((response) => {
                vm.wrongTags = response.data.content;
                //console.log(vm.wrongTags);
             })
              .catch(function(response) {
                console.log("there are something wrong!!!");
                console.log(response);
              })

    }
    }
}
</script>