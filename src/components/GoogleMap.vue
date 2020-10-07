<template>
<gmap-map :center="{ lat: 37.0902, lng: -95.7129 }" :zoom="4" style="width: 100%; height: 500px">
  <gmap-marker :key="i" v-for="(data, i) in childData" :position="{
        lat: parseFloat(data.latitude),
        lng: parseFloat(data.longitude),
      }" :title="data.name" :clickable="true" :draggable="false" @click="
        center = {
          lat: parseFloat(data.latitude),
          lng: parseFloat(data.longitude),
        }
      "></gmap-marker>
</gmap-map>
</template>

<script>
export default {
  props: ["childData"],
  data() {
    return {
      center: {
        lat: this.latitude,
        lng: this.longitude,
      },
    };
  },
};
</script>
