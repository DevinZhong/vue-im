<script>
  export default {
    props: {
      inputType: {
        type: String,
        required: false,
        default: 'button',
      },
      inputValue: {
        type: String,
        required: false,
        default: '确定',
      },
    },
  }
</script>

<template>
  <div class="button_box">
    <input type="{{ inputType }}" value="{{ inputValue }}">
  </div>
</template>

<style lang="scss" scoped>
  .button_box {
    display: flex;
    margin: .5rem;
    > input {
      flex: 1;
      padding: .25rem;
      outline: none;
      font-size: 1.25rem;
      opacity: .8;
      border: 1px solid transparent;
      &:hover {
        opacity: 1;
        cursor: pointer;
      }
    }
  }
</style>