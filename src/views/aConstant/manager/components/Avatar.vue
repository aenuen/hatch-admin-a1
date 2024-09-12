<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm">
      <el-form-item :label-width="labelWidth">
        <el-button :type="cutterControl ? 'primary' : 'default'" class="el-icon-upload" @click="cutterToggle"> 上传头像 </el-button>
      </el-form-item>
      <el-row>
        <el-col>
          <el-form-item prop="avatar" :label="`我的${fields.avatar}`" :label-width="labelWidth">
            <div class="avatar_wrap">
              <div v-for="(item, index) in avatarList" :key="index" class="avatar-item">
                <div class="avatar-main" :class="{ current: avatar === item }">
                  <el-avatar class="avatar-show" shape="circle" fit="cover" :src="item" :size="80" />
                  <div class="avatar-work">
                    <div class="avatar-half" />
                    <div class="avatar-live">
                      <div class="avatar-mode">
                        <el-button v-if="item.indexOf('constant') > -1 && item !== avatar" type="default" size="mini" icon="el-icon-check" @click="useTheAvatar(item)" />
                        <el-button-group v-if="item.indexOf('upload') > -1 && item !== avatar">
                          <el-button size="mini" icon="el-icon-check" @click="useTheAvatar(item)" />
                          <el-button type="default" size="mini" icon="el-icon-delete" @click="removeAvatar(item)" />
                        </el-button-group>
                        <el-button v-if="item === avatar" type="default" size="mini">使用中…</el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog v-if="cutterControl" title="上传头像" width="800px" :visible.sync="cutterControl">
      <ImgCutter @onCutSuccess="onCutSuccess" />
    </el-dialog>
  </div>
</template>

<script>
// api
import { userApi } from '@/api/user'
// components
// data
import { fields } from '../modules/fields'
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
// plugins
import { mapGetters } from 'vuex'
import { aoDeleteValue } from 'abbott-methods/import'
import ImgCutter from '@/components/ImgCutter'
// settings

export default {
  name: 'PersonalAvatar',
  components: { ImgCutter },
  mixins: [DetailMixin],
  data() {
    return {
      fields,
      avatarList: [],
      cutterControl: false
    }
  },
  computed: {
    ...mapGetters(['aid', 'avatar'])
  },
  mounted() {
    this.getAvatarList()
  },
  methods: {
    // 剪切框打开关闭切换
    cutterToggle() {
      this.cutterControl = !this.cutterControl
    },
    // 剪切成功
    onCutSuccess(res) {
      userApi.avatarUpload({ id: this.aid, avatar: res.dataURL }).then(({ code, data, msg }) => {
        if (code === 200) {
          // 头像同步更新
          this.$store.commit('user/SET_AVATAR', data)
          // 头像加入列表尾部
          this.avatarList.push(data)
          // 提示成功
          this.$message.success(msg)
        } else {
          // 提示失败
          this.$message.error(msg)
        }
      })
      // 关闭剪切窗口
      this.cutterToggle()
    },
    // 获取头像列表
    getAvatarList() {
      userApi.avatarList({ id: this.aid }).then(({ code, data }) => {
        if (code === 200) {
          this.avatarList = data
        }
      })
    },
    // 使用头像
    useTheAvatar(avatar) {
      userApi.avatarUse({ id: this.aid, avatar }).then(({ msg, code }) => {
        if (code === 200) {
          this.$store.commit('user/SET_AVATAR', avatar)
          this.$message.success(msg)
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 删除头像
    removeAvatar(avatar) {
      this.$confirm('删除后将无法恢复，确定继续删除吗？', '温馨提示', {
        type: 'warning'
      })
        .then(() => {
          userApi.avatarRemove({ id: this.aid, avatar }).then(({ msg, code }) => {
            if (code === 200) {
              const newAry = aoDeleteValue(this.avatarList, avatar)
              this.avatarList = [...newAry]
              this.$message.success(msg)
            } else {
              this.$message.error(msg)
            }
          })
        })
        .catch(() => {
          this.$message.info('取消删除')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  border: 1px solid #eee;
  height: 20px;
}
.avatar_wrap {
  width: 100%;
  overflow: hidden;
  .avatar-item {
    float: left;
    position: relative;
    &:hover {
      .avatar-work {
        display: block;
      }
    }
    .avatar-work {
      display: none;
      position: absolute;
      z-index: 1;
      width: 120px;
      height: 120px;
      left: 0;
      top: 0;
      .avatar-half {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 2;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 50%;
      }
      .avatar-live {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 3;
        .avatar-mode {
          display: flex;
          width: 100%;
          height: 100%;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .avatar-main {
      width: 120px;
      height: 120px;
      margin-bottom: 20px;
      margin-right: 10px;
      border: 1px solid #eee;
      background-color: #eee;
      border-radius: 50%;
      padding: 20px;
    }
  }
}
</style>
