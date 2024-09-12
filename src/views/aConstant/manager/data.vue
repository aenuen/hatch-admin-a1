<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="user-data">
            <el-card style="margin-bottom: 20px">
              <div slot="header" class="clearfix">
                <span>个人资料</span>
              </div>
              <div class="box-center">
                <el-avatar :size="100" :src="avatar" @error="true">
                  <img :src="NoneImage" alt />
                </el-avatar>
              </div>
              <div class="user-info">
                <div class="user-name">{{ petName }}</div>
                <div class="user-role text-muted">{{ rolesCn }}</div>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="18">
          <el-card style="margin-bottom: 20px">
            <div slot="header" class="clearfix">
              <span>编辑资料</span>
            </div>
            <el-tabs v-model="queryList.activeTab" @tab-click="tabsClick">
              <el-tab-pane label="登录密码" name="password"><password /></el-tab-pane>
              <el-tab-pane label="基本资料" name="base"><base-data /></el-tab-pane>
              <el-tab-pane label="更换头像" name="avatar"><avatar /></el-tab-pane>
              <el-tab-pane label="电子邮箱" name="email"><email /></el-tab-pane>
              <el-tab-pane label="手机号码" name="mobile"><mobile /></el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// api
// components
import Password from './components/Password'
import BaseData from './components/BaseData'
import Avatar from './components/Avatar'
import Email from './components/Email'
import Mobile from './components/Mobile'
// data
import { rolesParse } from './modules/roles'
import NoneImage from '@/assets/image/noneImage.png'
// filter
// function
// mixin
import ListMixin from '@/components/Mixins/ListMixin'
// plugins
import { mapGetters } from 'vuex'
// settings
export default {
  name: 'ViewsPersonalIndex',
  components: { Password, BaseData, Avatar, Email, Mobile },
  mixins: [ListMixin],
  data() {
    return {
      rolesCn: '',
      NoneImage
    }
  },
  computed: {
    ...mapGetters(['roles', 'petName', 'avatar'])
  },
  created() {
    this.rolesCn = rolesParse(this.roles.join(','))
  },
  methods: {
    setData() {
      return {
        activeTab: 'password'
      }
    },
    tabsClick(tabs) {
      this.queryList.activeTab = tabs.name
      this.refresh()
    }
  }
}
</script>
<style lang="scss" scoped>
.user-data {
  .box-center {
    margin: 0 auto;
    display: table;
  }

  .user-info {
    text-align: center;
  }

  .user-name {
    padding-top: 10px;
    font-weight: bold;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
    color: #777;
  }
}
</style>
