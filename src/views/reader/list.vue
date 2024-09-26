<template>
  <div class="app-container">
    <VuePDF />
  </div>
</template>
<script>
// api
import api from '@/api'
// components
// data
// filter
// function
// mixin
// plugins
import VuePDF from '@/components/VuePDF'
// settings
export default {
  name: 'ReaderList',
  components: { VuePDF },
  mixins: [],
  data() {
    return {
      api,
    }
  },
  created() {},
  methods: {},
}
</script>
<style lang="scss" scoped></style>
