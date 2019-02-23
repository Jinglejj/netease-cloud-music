<template>
  <div>123</div>
</template>

<script>
  import mixin from './mixin'
  import {getSimiArtist} from "@/apis/artists";
  import Card from '@/components/Card'

  export default {
    name: "SimiArtists",
    mixins: [mixin],
    data() {
      return {
        artists: []
      }
    },
    methods: {
      search() {
        getSimiArtist(this.id).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        });
      }
    },
    mounted() {
      this.search();
    }
  }
</script>

<style scoped>

</style>
