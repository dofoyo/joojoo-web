<template>
    <div>
      <div>
          <img :src="imagesrc" class="img-responsive" :alt="imagename">
      </div>
      <div v-show="false">
        <input type="file" id="selectImage" name="selectImage" accept="image/jpg,image/jpeg,image/png,image/gif" v-on:change="upload">
      </div>
      <span class="glyphicon glyphicon-folder-open" aria-hidden="true" @click="doSelect"></span>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        imagename:'',
        imagesrc:''
      }
    },
    methods: {
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
              let config = {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
              }
              this.$http.post(apiurl, formData, config).then(function (res) {
              //console.log(res);
              //vm.$set(vm.image,'src',res.body.content);
              //console.log(vm.image);
              //vm.image.url = res.body.content;
              vm.imagename = vm.image.name;
              vm.imagesrc = res.body.content;
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