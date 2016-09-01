<script>
  import { setFilter } from '../../../vuex/actions/appActions'

  export default {
    vuex: {
      actions: {
        setFilter,
      },
    },
    methods: {
      updateFilter(e) {
        this.setFilter(e.target.value)
      },
    },
  }
</script>

<template>
  <div class="search_bar">
    <i class="material-icons">search</i>
    <input @keyup="updateFilter">
  </div>
</template>

<style lang="scss" scoped>
  .search_bar {
    align-self: center;
    display: flex;
    background-color: #26292e;
    > i {
      flex: none;
      width: 1.5rem;
      height: 1.5rem;
      font-size: 1.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #8D8E91;
      user-select: none;
    }
    > input {
      max-width: 11rem;
      flex: auto;
      background-color: inherit;
      border: none;
      outline: none;
      color: #fff;
      font-size: 1rem;
    }
  }
</style>