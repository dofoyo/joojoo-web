<template>
    <div class="row">
    <div id="app"  class="col-md-5">
        <schart :canvasId="canvasId"
            :type="type"
            :width="width"
            :height="height"
            :data="difficulty"
            :options="options"
        ></schart>
    </div>
          <div  class="col-md-2" align="right">
          <div class="input-group">
          <input type="text" class="form-control" placeholder="按错误率筛选..." v-model='wrongRateFilter'>
          <span class="input-group-btn">
            <button class="btn btn-default" type="button" @click="getData">Go!</button>
          </span>
        </div>
     </div>

</div>
</template>
<script>
import Schart from 'vue-schart';
export default {
    data() {
        return {
            canvasId: 'myCanvas',
            type: 'pie',
            width: 800,
            height: 600,
            demodata: [
                {name: '2014', value: 1342},
                {name: '2015', value: 2123},
                {name: '2016', value: 1654},
                {name: '2017', value: 1795},
            ],
            options: {
                title: ''
            },
            difficulty:[],
            wrongRateFilter:''
        }
    },
    components:{
        Schart
    },
    mounted: function() {
      this.getData();
    },
    methods:{
    getData:function(){

      var vm = this;
      var apiurl = process.env.API_ROOT + 'difficultyChart';
      var resource = vm.$resource(apiurl);

      resource.get({wrongRateFilter:vm.wrongRateFilter})
              .then((response) => {
                vm.difficulty = response.data.content;
                //console.log(vm.wrongRate);
             })
              .catch(function(response) {
                console.log("there are something wrong!!!");
                console.log(response);
              })

    }
    }
}
</script>