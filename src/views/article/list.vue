<template>
  <div class="app-container"></div>
</template>
<script>
// api
// components
// data
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import ListMixin from '@/components/Mixins/ListMixin'
// plugins
// settings
export default {
  name: 'ArticleList',
  components: {},
  mixins: [DetailMixin, MethodsMixin, ListMixin],
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>
<style lang="scss" scoped></style>
