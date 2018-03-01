<template>
    <div>
      <img :src="image.src" :alt="image.name"/>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        image:{name:'vue log',src:'https://vuejs.org/images/logo.png'}
      }
    }
  }
</script>