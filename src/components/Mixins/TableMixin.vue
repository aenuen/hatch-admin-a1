<script>
export default {
  methods: {
    // 排序变化
    onSortChange(data) {
      this.$emit('onSortChange', data)
    },
    // 状态变化
    onIsUseChange(event, id) {
      this.$emit('onIsUseChange', event, id)
    },
    // 多选变化
    onSelectorChange(val) {
      this.$emit('onSelectorChange', val)
    },
    // 单个删除
    onRemoveAlone(id) {
      this.$emit('onRemoveAlone', id)
    },
    // 单个编辑
    onUpdateAlone(id) {
      this.$emit('onAloneUpdate', id)
    },
    // 双击事件
    onDblclickAlone(row) {
      this.$emit('onDblclickAlone', row.id)
    }
  }
}
</script>
