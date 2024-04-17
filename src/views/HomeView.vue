<template>
  <div id="info">Texture(DOM + CSS)</div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
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
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cube)

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
const colorObj = { color: `#${cube.material.color.getHexString()}` }
gui.addColor(colorObj, 'color').onChange((e) => {
  cube.material.color.set(e)
})

// 动画
const animate = () => {
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()
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
