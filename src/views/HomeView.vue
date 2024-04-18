<template>
  <div id="info">Texture(DOM + CSS)</div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import * as dat from 'dat.gui'

// 场景初始化
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

camera.position.set(5, 5, 5)
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// 立方体渲染
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
// 1. 定义颜色数组（x 正负，y 正负，z 正负）
const colorArr = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff]
// 2. 遍每个颜色字符串映射成材质对象
const cubeMaterialArr = colorArr.map((color) => new THREE.MeshBasicMaterial({ color }))
// 3. 将材质对象数组传入 Mesh 构造函数
const cube = new THREE.Mesh(cubeGeometry, cubeMaterialArr)
scene.add(cube)

// 组
const group = new THREE.Group()
const cubeInfo = [
  { color: 0x00ffff, w: 1, h: 1, d: 1, x: 2, y: 0, z: 0 },
  { color: 0xff00ff, w: 1, h: 1, d: 1, x: 0, y: 0, z: 2 }
]
cubeInfo.forEach(({ color, w, h, d, x, y, z }) => {
  const cubeGeometry = new THREE.BoxGeometry(w, h, d)
  const cubeMaterial = new THREE.MeshBasicMaterial({ color })
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
  cube.position.set(x, y, z)
  group.add(cube)
})
scene.add(group)

// 移除立方体
window.addEventListener('dblclick', () => {
  // 1. 调用相关废弃函数
  group.children.forEach((child: any) => {
    child.geometry.dispose()
    child.material.dispose()
    group.remove(child)
  })
  // 2. 从场景中移除立方体
  scene.remove(group)
})

// 线条渲染
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff })
const linePoints = []
linePoints.push(new THREE.Vector3(-5, 0, 0))
linePoints.push(new THREE.Vector3(0, 5, 0))
linePoints.push(new THREE.Vector3(5, 0, 0))
const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints)
const line = new THREE.Line(lineGeometry, lineMaterial)
scene.add(line)

// 轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.1
// controls.autoRotate = true

// 添加坐标轴
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// 窗口大小自适应
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})

// 图形用户界面
const gui = new dat.GUI()
gui.add(document, 'title')
gui.add(cube, 'visible')
gui.add(controls, 'reset')
// 控制立方体颜色
const colorObj = { color: `#${cube.material[0].color.getHexString()}` }
gui.addColor(colorObj, 'color').onChange((e) => {
  cube.material[0].color.set(e)
})
// 创建分组-影响立方体位置
const folder = gui.addFolder('位移')
// 参数：最小值范围，最大值范围，步长
folder.add(cube.position, 'x', 0, 5, 0.1)
folder.add(cube.position, 'y', 0, 5, 0.1)
folder.add(cube.position, 'z', 0, 5, 0.1)
// 下拉菜单-第三个参数为对象时->下拉菜单
// 对象中属性名->下拉菜单选项名
// 初始值匹配后会影响下拉菜单默认选中哪一项
gui.add({ type: '1' }, 'type', { 选项1: '1', 选项2: '2' }).onChange((e) => {
  switch (e) {
    case '1':
      cube.position.set(0, 0, 0)
      break
    case '2':
      cube.position.set(1, 1, 1)
      break
  }
})

// 性能监控
const stats = new Stats()
document.body.appendChild(stats.dom)

// 循环渲染
const renderLoop = () => {
  controls.update()
  stats.update()
  renderer.render(scene, camera)
  requestAnimationFrame(renderLoop)
}

renderLoop()
</script>

<style scoped lang="scss">
#info {
  color: #fff;
  font-size: 40px;
  font-weight: bold;
  position: absolute;
  top: 10px;
  width: 100%;
  text-align: center;
  z-index: 100;
  display: block;
}
</style>
