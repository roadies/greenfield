<template>
  <div>
    <b-col>
        <b-card
          :title="title"
          tag="journal"
          style="max-width:200rem"
          class="mb-2"
          :footer="date"
        >
          <b-card-text>
            {{body}}
          </b-card-text>
        </b-card>
      </b-col>
  </div>
</template>

<script>
import axios from "axios";
  export default {
    props: ["title","date","body"]
  }
</script>

<style lang="scss" scoped>

</style>