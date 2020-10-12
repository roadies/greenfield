<template>
<div>
  <b-button align="left" variant="primary" v-on:click="toggleModal">New Journal
  </b-button>

  <b-modal :id="modalName" title="New Journal Entry">
    <div>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-1" label="Title:" label-for="input-1" description="Title Your Journal Entry.">
          <b-form-input id="input-1" v-model="form.title" type="text" required placeholder="Enter title"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Location:" label-for="input-2">
          <b-form-input id="input-2" v-model="form.location" required placeholder="Enter Location"></b-form-input>
        </b-form-group>

        <fileUpload :trip="this.trip" />

        <b-form-group id="input-group-3" label="Body:" label-for="input-3">
          <b-form-textarea id="input-3" v-model="form.body" required></b-form-textarea>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
  </b-modal>
  <b-container> </b-container>
</div>
</template>

<script>
import axios from "axios";
import fileUpload from "./fileUpload.vue";
export default {
  props: ["trip"],
  data() {
    return {
      modalName: this.trip.id.toString(),
      form: {
        title: "",
        location: "",
        body: "",
        selectedFile: "",
        tripId: this.trip.id,
      },
      show: true,
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.form.userId = this.$store.state.userId;
      this.form.date = new Date();
      this.form.imageLink = this.$store.state.imageLink;
      axios.post("/api/journals", this.form).catch((err) => console.error(err));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.title = "";
      this.form.location = "";
      this.form.body = null;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    toggleModal() {
      this.$bvModal.show(this.trip.id.toString());
    },
  },
  components: {
    fileUpload: fileUpload,
  },
};
</script>

<style lang="scss" scoped>
</style>
