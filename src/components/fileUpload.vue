<template>
<div>
  <div class="container">
    <form>
      <div class="form-group">
        <input type="file" @change="uploadFile" multiple />
        <img v-if="imageUploaded" :src="imageLink" />
      </div>
    </form>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  props: ['trip'],
  data() {
    return {
      files: null,
      tripId: this.trip.id,
      imageLink: null,
      imageUploaded: false      
    };
  },
  methods: {
    uploadFile(event) {
      this.file = event.target.files[0];
      const formdata = new FormData();
      formdata.append("image", this.file);

      axios.post('https://api.imgur.com/3/upload', 
        formdata,
        {headers: {
          Authorization: "Client-ID 2b4745ad129c718"
        }})
        .then(res => {
            this.imageLink = res.data.data.link
            this.$store.state.imageLink = this.imageLink;
            this.imageUploaded = true;
          });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
