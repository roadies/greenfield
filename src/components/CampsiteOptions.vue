<template>

</template>

<script>
export default {
  name: "CampsiteOptions",
  props: ['dailyOptionsList'],
  data: function() {
    return {
      options: []
    };
  },
  watch: {
    dailyOptionsList: function() {
      this.options = this.dailyOptionsList;
    }
  }
};
</script>

<style scoped>

</style>