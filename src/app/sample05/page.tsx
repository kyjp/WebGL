'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const Sample05 = () => {
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
      antialias: true,
      alpha: true
    })
    // レンダラーのサイズを設定
    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    )
    // 平面の作成時に使用

    const geometry = new THREE.BoxGeometry(10, 10, 10)
    const geometry2 = new THREE.PlaneGeometry(20, 20)
    const geometry3 = new THREE.TorusGeometry(10, 3, 200, 20)
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000
    })
    const material2 = material.clone()
    material2.color = new THREE.Color(0x00ff00)
    const material3 = material.clone()
    material3.color = new THREE.Color(0x0000ff)

    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.x -= 25
    const mesh2 = new THREE.Mesh(geometry2, material2)
    mesh2.position.x += 25
    const mesh3 = new THREE.Mesh(geometry3, material3)
    scene.add(mesh, mesh2, mesh3)

    const axis = new THREE.AxesHelper(20)
    scene.add(axis)
    camera.position.z = 30
    // @ts-ignore
    const control = new OrbitControls(camera, canvas.current)
    const animate = () => {
      // 最適なタイミングでコールバック関数を実行
      requestAnimationFrame(animate)
      mesh.rotation.x += 0.01
      mesh.rotation.y += 0.01
      mesh2.rotation.z += 0.01
      mesh3.rotation.y += 0.01
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

export default Sample05
