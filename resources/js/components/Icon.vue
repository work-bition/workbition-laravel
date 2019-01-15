<template>
  <svg :class="`${name}`">
    <use :xlink:href="`#${name}`"></use>
  </svg>
</template>

<script>
  export default {
    name: "icon",
    props: ['name']
  }
</script>

<style lang="scss" scoped>
  svg {
    width:5rem;
    height:5rem;
    margin-bottom: 1rem;
  }
</style>
