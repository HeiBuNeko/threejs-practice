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
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
)

camera.position.set(5, 5, 5)
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// 立方缓冲几何体
const boxGeo = new THREE.BoxGeometry(1, 1, 1)
// 1. 定义颜色数组（x 正负，y 正负，z 正负）
const colorArr = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff]
// 2. 遍每个颜色字符串映射成材质对象
const boxMatArr = colorArr.map(color => new THREE.MeshBasicMaterial({ color }))
// 3. 将材质对象数组传入 Mesh 构造函数
const box = new THREE.Mesh(boxGeo, boxMatArr)
scene.add(box)

// 组
const group = new THREE.Group()
const boxInfo = [
  { color: 0x00ffff, w: 1, h: 1, d: 1, x: 2, y: 0, z: 0 },
  { color: 0x0000ff, w: 1, h: 1, d: 1, x: 4, y: 0, z: 0 },
]
boxInfo.forEach(({ color, w, h, d, x, y, z }) => {
  const boxGeo = new THREE.BoxGeometry(w, h, d)
  const boxMat = new THREE.MeshBasicMaterial({ color })
  const box = new THREE.Mesh(boxGeo, boxMat)
  box.position.set(x, y, z)
  group.add(box)
})
scene.add(group)

// 球缓冲几何体
const sphereGeo = new THREE.SphereGeometry(0.5, 32, 32)
const sphereMat = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
  side: THREE.DoubleSide,
})
const sphere = new THREE.Mesh(sphereGeo, sphereMat)
sphere.position.set(6, 0, 0)
scene.add(sphere)

// 圆形缓冲几何体
const circleGeo = new THREE.CircleGeometry(0.5, 128)
const circleMat = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
  side: THREE.DoubleSide,
})
const circle = new THREE.Mesh(circleGeo, circleMat)
circle.position.set(4, 2, 0)
scene.add(circle)

// 平面缓冲几何体
const planeGeo = new THREE.PlaneGeometry(1, 1)
const planeMat = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
  side: THREE.DoubleSide,
})
const plane = new THREE.Mesh(planeGeo, planeMat)
plane.position.set(2, 2, 0)
scene.add(plane)

// 点
const pointMat = new THREE.PointsMaterial({ color: 0x00ffff, size: 0.01 })
const pointSphere = new THREE.Points(sphereGeo, pointMat)
pointSphere.position.set(6, 2, 0)
scene.add(pointSphere)

// 线
const lineMat = new THREE.LineBasicMaterial({ color: 0x0000ff })
const linePoints = []
linePoints.push(new THREE.Vector3(-5, 0, 0))
linePoints.push(new THREE.Vector3(0, 5, 0))
linePoints.push(new THREE.Vector3(5, 0, 0))
const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints)
// Line 线 LineLoop 环线 LineSegments 线段
const line = new THREE.Line(lineGeo, lineMat)
scene.add(line)

// 星空
const starVertices = []
for (let i = 0; i < 10000; i++) {
  const x = THREE.MathUtils.randFloatSpread(2000)
  const y = THREE.MathUtils.randFloatSpread(2000)
  const z = THREE.MathUtils.randFloatSpread(2000)
  starVertices.push(x, y, z)
}
const starGeo = new THREE.BufferGeometry()
starGeo.setAttribute(
  'position',
  new THREE.Float32BufferAttribute(starVertices, 3),
)
const starMat = new THREE.PointsMaterial({ color: 0x888888 })
const points = new THREE.Points(starGeo, starMat)
scene.add(points)

// 移除立方体
// window.addEventListener('dblclick', () => {
//   // 1. 调用相关废弃函数
//   group.children.forEach((child) => {
//     child.geometry.dispose()
//     child.material.dispose()
//     group.remove(child)
//   })
//   // 2. 从场景中移除立方体
//   scene.remove(group)
// })

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
gui.add(box, 'visible')
gui.add(controls, 'reset')
// 控制立方体颜色
const colorObj = { color: `#${box.material[0].color.getHexString()}` }
gui.addColor(colorObj, 'color').onChange(e => {
  box.material[0].color.set(e)
})
// 创建分组-影响立方体位置
const folder = gui.addFolder('位移')
// 参数：最小值范围，最大值范围，步长
folder.add(box.position, 'x', 0, 5, 0.1)
folder.add(box.position, 'y', 0, 5, 0.1)
folder.add(box.position, 'z', 0, 5, 0.1)
// 下拉菜单-第三个参数为对象时->下拉菜单
// 对象中属性名->下拉菜单选项名
// 初始值匹配后会影响下拉菜单默认选中哪一项
gui.add({ type: '1' }, 'type', { 选项1: '1', 选项2: '2' }).onChange(e => {
  switch (e) {
    case '1':
      box.position.set(0, 0, 0)
      break
    case '2':
      box.position.set(1, 1, 1)
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
