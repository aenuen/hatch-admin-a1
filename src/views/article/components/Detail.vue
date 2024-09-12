<template>
  <div class="app-container"></div>
</template>
<script>
// api
import api from '@/api'
// components
// data
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
// settings
export default {
  name: 'ArticleDetail',
  components: {},
  mixins: [DetailMixin, MethodsMixin],
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
