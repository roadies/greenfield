<template>
  <div>
    <h1>Journals</h1>
    <b-container align-v="center">
      <JournalForm />
    </b-container>
  </div>
</template>

<script>
  import JournalForm from "../components/JournalForm.vue";
  export default {
    components: {
      "JournalForm": JournalForm
    },
  };
</script>

<style lang="scss" scoped>

</style>