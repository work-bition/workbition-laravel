<template>

  <p> {{ greeting }} World! </p>

</template>

<script>

  export default {
    data: function () {
      return {
        greeting: 'hello'
      }
    }
  }

</script>

<style lang="scss" scoped>
  $font-size:3rem;
  p {
    font-size: $font-size;
    color: green;
  }
</style>
