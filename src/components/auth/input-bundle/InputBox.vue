<script>
  export default {
    props: {
      content: {
        type: String,
        required: false,
      },
      inputType: {
        type: String,
        required: false,
        default: 'text',
      },
      hint: {
        type: String,
        required: false,
        default: '',
      },
    },
  }
</script>

<template>
  <div class="input_box">
    <input v-model="content" type="{{ inputType }}" placeholder="{{ hint }}">
  </div>
</template>

<style lang="scss" scoped>
  .input_box {
    display: flex;
    margin: .5rem;
    > input {
      flex: 1;
      padding: .25rem;
      font-size: 1rem;
      border: none;
      border-bottom: 1px solid green;
      outline: none;
    }
  }
</style>