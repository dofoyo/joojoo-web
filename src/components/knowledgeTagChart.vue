<template>
    <div id="app">
        <schart :canvasId="canvasId"
            :type="type"
            :width="width"
            :height="height"
            :data="knowledgeTags"
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
            width: 1200,
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
            knowledgeTags:[]
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
      var apiurl = process.env.API_ROOT + 'knowledgeTags';
      var resource = vm.$resource(apiurl);

      resource.get()
              .then((response) => {
                vm.knowledgeTags = response.data.content;
                console.log(vm.knowledgeTags);
             })
              .catch(function(response) {
                console.log("there are something wrong!!!");
                console.log(response);
              })

    }
    }
}
</script>