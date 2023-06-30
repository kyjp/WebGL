'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const Sample07 = () => {
  const canvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!canvas) return
    // シーンを作成
    const scene = new THREE.Scene()
    //カメラを作成
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    // canvasに描写するインスタンスを作成
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas.current || undefined,
      antialias: true
    })
    // レンダラーのサイズを設定
    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    )

    // 床
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(1000, 1000),
      // 光を反射するマテリアル
      new THREE.MeshStandardMaterial({
        color: 0xf4f4f4,
        side: THREE.DoubleSide
      })
    )

    // 90度回転　radian = degree * Math.PI / 180
    floor.rotation.x = THREE.MathUtils.degToRad(90)
    floor.position.y = -50
    scene.add(floor)

    const geometry = new THREE.TorusKnotGeometry(5, 1.5, 100, 100)
    const basic = new THREE.MeshBasicMaterial({
      color: 0x3f7b9d,
    })
    // シック
    const lambert = new THREE.MeshLambertMaterial({
      color: 0x3f7b9d,
    })
    // 光沢
    const standard = new THREE.MeshStandardMaterial({
      color: 0x3f7b9d,
      roughness: 0
    })
    const mesh = new THREE.Mesh(geometry, basic)
    mesh.position.x -= 20
    const mesh2 = new THREE.Mesh(geometry, lambert)
    const mesh3 = new THREE.Mesh(geometry, standard)
    mesh3.position.x += 20
    scene.add(mesh, mesh2, mesh3)
    const axis = new THREE.AxesHelper(20)
    scene.add(axis)

    camera.position.z = 30
    // @ts-ignore
    const control = new OrbitControls(camera, canvas.current)
    // ライト
    // 均等に照らすライト
    // const amlight = new THREE.AmbientLight(0x404040)
    // scene.add(amlight)

    // 並行に照らすライト
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(0, 4, 10)
    const dHelper = new THREE.DirectionalLightHelper(directionalLight)
    scene.add(directionalLight, directionalLight.target, dHelper)

    // 点光源
    const plight = new THREE.PointLight(0xffffff, 1, 100) // 色　強度　距離
    const spherical = new THREE.Spherical(20, 1, 1)
    plight.position.setFromSpherical(spherical)
    const pHelper = new THREE.PointLightHelper(plight)
    scene.add(plight, pHelper)

    const animate = () => {
      // 最適なタイミングでコールバック関数を実行
      requestAnimationFrame(animate)
      spherical.phi += 0.01
      spherical.theta += 0.01
      plight.position.setFromSpherical(spherical)
      // dHelper.update()
      control.update()
      // canvasに描写
      renderer.render(scene, camera)
    }
    animate()
  }, [])

  return (
    <>
      <canvas ref={canvas} />
    </>
  )
}

export default Sample07
