<template>
  <div class="JournalForm">
    <form>
    <p> Post Title: {{postTitle}}</p>
    <input v-model="postTitle" type="text" placeholder="Post Title" />
    <textarea v-model="postBody" placeholder="Journal Body Here"/>
    </form>
  </div>
</template>

<script>

export default {
  name: "JournalForm",
  data() {
    return {
      postTitle: '',
      postBody: '',
    }
  },
  methods: {

  }
}
</script>

<style>
</style>