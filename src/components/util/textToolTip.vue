<template>
  <el-tooltip :content="txtInfo" placement="top" effect="light" :disabled="isDisabled">
    <div class="wordnowrap" :class="{isLink: 'link-text'}" @mouseenter="isShowTooltip" @click="linkTo">{{txtInfo}}</div>
  </el-tooltip>
</template>

<script>
export default{
  name: 'ShowTooltips',
  props: {
    txtInfo: '',
    isLink: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data(){
    return {
      isDisabled: false
    }
  },
  methods: {
    isShowTooltip(e){
      let clientWidth = e.target.clientWidth,
        scrollWidth = e.target.scrollWidth,
        arrList = Array.from(e.target.classList)
      if(scrollWidth > clientWidth){
        this.isDisabled = false
        if(!arrList.includes('hover-blue')){
          e.target.classList.add('hover-blue')
        }
      } else {
        this.isDisabled = true
        e.target.classList.remove('hover-blue')
      }
    },
    linkTo(){
      if(this.isLink){
        this.$emit("linkTo")
      }
    }
  }
}
</script>

<style scoped>
.wordnowrap{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hover-blue:hover{
  /*color: blue;*/
}
.link-text{
  /*color: blue;*/
  cursor: pointer;
}
</style>
