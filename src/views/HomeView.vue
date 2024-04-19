<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header-layout">
        <h1>Threejs Practice</h1>
        <el-switch
          v-model="isDark"
          size="large"
          :active-action-icon="Moon"
          :inactive-action-icon="Sunny"
          @change="toggleDark"
        />
      </el-header>
      <el-main class="main-layout">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card class="card-container" @click="toPractice">
              <template #header> Threejs Practice</template>
              <el-image fit="fill" :src="ThreejsPrctice" />
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="card-container">
              <template #header>Coming Soon</template>
              <el-image fit="fill" :src="ThreejsPrctice" /> </el-card
          ></el-col>
        </el-row>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Sunny, Moon } from '@element-plus/icons-vue'
import ThreejsPrctice from '@/assets/ThreejsPrctice.jpg'

// 暗黑模式
const isDark = ref(true)
const toggleDark = () => {
  const html = document.querySelector('html')
  const currentTheme = html?.getAttribute('class')
  html?.setAttribute('class', currentTheme === 'dark' ? 'light' : 'dark')
}

const router = useRouter()
const toPractice = () => {
  router.push({ name: 'ThreejsPractice' })
}
</script>

<style scoped lang="scss">
.common-layout {
  .header-layout {
    margin-top: 10px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .main-layout {
    .card-container {
      cursor: pointer;
    }
  }
}
</style>
