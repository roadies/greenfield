<template>
<div class="journal">
  <h2 class="journal_title">journals</h2>
  <b-container align-v="center">
    <JournalList v-for="journal in journals.slice().reverse()" :key="journal.date" :title="journal.title" :date="journal.date" :body="journal.body" :id="journal.id" :tripId="journal.tripId" :imageLink="journal.imageLink" />
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

<style scoped>
.journal {
  padding-bottom: 100%;
}

.journal_title {
  position: relative;
  padding-top: 10px;
  text-align: center;
  padding-bottom: 20px;
  font-family: 'Montserrat';
  font-weight: bold;
}
</style>
