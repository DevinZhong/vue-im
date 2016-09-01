<script>
  export default {
    props: {
      keyword: {
        type: String,
        required: true,
      },
    },
  }
</script>


<template>
  <div class="search_bar">
    <input class="keyword" type="text" v-model="keyword" placeholder="在这里输入关键字">
    <input class="submit" type="submit" value="查找">
  </div>
</template>


<style lang="scss" scoped>
  div.search_bar {
    margin: .5rem 0;
    display: flex;
    justify-content: center;
    > input {
      line-height: 1.5rem;
      font-size: 1rem;
      height: 2rem;
      outline: none;
      border: 1px solid green;
      &.keyword {
        border-radius: .5rem 0 0 .5rem;
        text-align: center;
        border-right: none;
      }
      &.submit {
        border-radius: 0 .5rem .5rem 0;
        border-left: none;
        cursor: pointer;
        background-color: #ddd;
        &:hover {
          background-color: #ccc;
        }
      }
    }
  }
</style>