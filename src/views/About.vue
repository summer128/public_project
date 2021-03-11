<template>
  <div class="about">
    <div>this  is  about  pages</div>
      <img :src="headImgUrl" alt="">
  </div>
</template>

<script>
export default {
  data(){
    return{
      headImgUrl:''
    }
  },
  created(){
    this.headImgUrl = this.$cookies.get('headimgurl')
    console.log(this.$cookies.get('headimgurl'))
  }
  
}
</script>

<style lang="less" scoped>
img{
  width: 60px;
}
</style>
