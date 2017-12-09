<template>
  <div class="questionlist">
    <div class="row" v-for="(question,index) in questions">
      <div class="col-md-7" align="left">
        {{index+1}}
        <p></p>
        {{question.content}}
        <p></p>
        <img :src="question.contentImageUrl">
        <p></p>
        <p></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'questionlist',
  data () {
    return {
      questions:[]
    }
  },
  mounted: function() {
      this.getData();
  },
  methods:{
    getData:function(){

      var vm = this;
      var apiurl = process.env.API_ROOT + 'questions';
      var resource = vm.$resource(apiurl);

      resource.get()
              .then((response) => {
                vm.questions = response.data.content;
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
