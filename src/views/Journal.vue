<template>
<div>
  <h1>Journals</h1>
  <b-container align-v="center">
    <JournalForm />
    <JournalList v-for="journal in journals" :key="journal.date" :title="journal.title" :date="journal.date" :body="journal.body" />
  </b-container>
</div>
</template>

<script>
import JournalForm from "../components/JournalForm.vue";
import journalList from "../components/journalList.vue";
import axios from "axios";
export default {
  components: {
    JournalForm: JournalForm,
    JournalList: journalList,
  },
  data() {
    return {
      journals: [],
    };
  },
  mounted() {
    this.getJournals();
  },
  methods: {
    getJournals() {
      axios
        .get("/api/journals")
        .then((results) => (this.journals = results.data));
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
