<script>
// api
// components
// data
// filter
// function
// mixin
// plugins
// settings
export default {
  name: 'DictPopup',
  components: {},
  mixins: [],
  data() {
    return {
      popupVisible: false,
      isUpdate: false,
    }
  },
  created() {},
  methods: {
    popupClose() {
      this.popupVisible = false
      this.isUpdate = false
      this.parent_id = 0
      this.parent_name = ''
    },
    popupCreate(id, name) {
      this.popupVisible = true
      this.isUpdate = false
      this.parent_id = id
      this.parent_name = name
    },
    successCreate() {
      this.popupVisible = false
      this.isUpdate = false
      this.parent_id = 0
      this.parent_name = ''
      this.gainList()
    },
    popupUpdate(id) {
      this.popupVisible = true
      this.isUpdate = true
      this.updateId = id
    },
    successUpdate() {
      this.popupVisible = false
      this.isUpdate = false
      this.updateId = 0
      this.gainList()
    },
  },
}
</script>
<style lang="scss" scoped></style>
