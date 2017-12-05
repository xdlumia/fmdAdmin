
<template>
  <div class="d-main">
    <div class="mt60"> fdsfdsf</div>
  </div>
</template>

<script>



import axios from 'axios'

// let HTTP = axios.create({
//   baseURL:" http://easy-mock.com/mock/5a14c5d85d683e067acc5911/ABC/",
//   timeout:2000
// })

  export default {
    created(){
      HTTP.get('template')
       .then((res)=>{
        console.log(1)
       })
       .catch((error)=>{
        console.log("失败")
       })
    }
  }

</script>
<style>

</style>
