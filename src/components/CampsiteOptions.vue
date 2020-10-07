<template>
  <div>
    <li v-for="(item, index) in optionList" :key="index">
      <ul>
        <li>name: {{ item.name }}</li>
        <li>coordinates: {{ item.latitude }}, {{ item.longitude }}</li>
        <li>location: {{ item.city }}, {{item.state_code}}</li>
      </ul>
    </li>
  </div>
</template>

<script>
export default {
  name: "CampsiteOptions",
  props: ['option'],
  data: function() {
    return {
      optionList: []
    };
  },
  watch: {
    option: function() {
      this.optionList = this.option;
    }
  }
};
</script>

<style scoped>

</style>