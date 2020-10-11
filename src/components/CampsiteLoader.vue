<template>
<div class="trip-planner">
  <form id="campsite-loader" v-on:submit.prevent="processForm" v-on:keyup.enter="processForm">
    <label for="origin">where are you coming from?</label>
    <input type="text" id="origin" class="form-control" v-model="currentTrip.origin.address" />

    <label for="destination">where are you going?</label>
    <input type="text" id="destination" class="form-control" v-model="currentTrip.destination.address" />

    <label for="dailyDriveTime">how long do you want to drive each day?</label>
    <input min="1" max="23" type="number" id="dailyDriveTime" class="form-control" v-model.number="currentTrip.dailyDriveTime" />

    <label for="tripStartDate">when are you setting out?</label>
    <input type="date" id="tripStartDate" class="form-control" v-model="currentTrip.tripStartDate" />
    <div class="button-route">
      <button class="btn btn-primary">Map Out Route</button>
    </div>
  </form>
</div>
</template>

<script>
import axios from "axios";
export default {
  name: "CampsiteLoader",
  props: ["locationsToQuery"],
  data() {
    return {
      currentTrip: {
        origin: {
          address: "",
          location: {
            lat: "",
            lng: "",
          },
        },
        destination: {
          address: "",
          location: {
            lat: "",
            lng: "",
          },
        },
        dailyDriveTime: "",
        tripStartDate: "",
      },
      legs: [],
      options: [],
    };
  },

  methods: {
    processForm: function () {
      this.$store.state.tripCalculated = true;
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({
          address: this.currentTrip.origin.address,
        },
        (res, status) => {
          if (status === "OK") {
            this.currentTrip.origin.location.lat = res[0].geometry.bounds.Ya.i;
            this.currentTrip.origin.location.lng = res[0].geometry.bounds.Sa.i;
          }
        }
      );
      geocoder.geocode({
          address: this.currentTrip.destination.address,
        },
        (res, status) => {
          if (status === "OK") {
            this.currentTrip.destination.location.lat =
              res[0].geometry.bounds.Ya.i;
            this.currentTrip.destination.location.lng =
              res[0].geometry.bounds.Sa.i;
          }
        }
      );
      setTimeout(() => {
        this.$emit("tripInput", this.currentTrip);
      }, 1000);
    },

    reverseGeocode: function () {
      const geocoder = new google.maps.Geocoder();
      this.legs.map((eachNight) => {
        const latlng = {
          lat: eachNight.end_lat,
          lng: eachNight.end_lng,
        };
        geocoder.geocode({
            location: latlng,
          },
          (results, status) => {
            if (status === "OK") {
              const zipCodePosition = results[0].address_components.length - 1;
              const eachNightZip =
                results[0].address_components[zipCodePosition].short_name;
              const fedCampsitesUrl = `https://www.recreation.gov/api/search?q=${eachNightZip}&exact=false&fq=campsite_type_of_use%3AOvernight&fq=entity_type%3Acampground&start=0`;
              axios.get(fedCampsitesUrl).then((res) => {
                this.options.push({
                  night: eachNight.dayNumber,
                  nearbyCamping: res.data.results,
                });
              });
            } else {
              alert(status);
            }
          }
        );
      });
      this.$emit("nightlyOptions", this.options);
    },
  },
  watch: {
    locationsToQuery: function () {
      this.legs = this.locationsToQuery;
      this.reverseGeocode();
    },
  },
};
</script>

<style>
.trip-planner {
  width: 50%;
  margin: auto;
  padding: 20px;
}

.button-route {
  padding-top: 10px;
  padding-left: 2px;
}

.button-route:hover {
  transform: scale(1.01);
}
</style>
