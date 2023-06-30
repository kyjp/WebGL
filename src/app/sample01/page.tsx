'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

let colorNum: number = 255
let type: '+' | '-' = '-'
const Sample01 = () => {
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
    // const geometry = new THREE.PlaneGeometry(10, 10)

    // 球の作成時に使用
    // const geometry = new THREE.SphereGeometry()

    // ドーナツの作成時に使用
    const geometry = new THREE.TorusGeometry()

    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      // 表示
      visible: true,
      // 透明度
      transparent: true,
      opacity: .5,
      // 線で表す
      wireframe: true
    })
    // material.color = new THREE.Color(0x00ff00)
    // material.color.set("skyblue")
    // material.color.set("rgb(255, 0, 0)")
    const timeId = setInterval(() => {
      material.wireframe = !material.wireframe
    }, 5000);
    const timeId2 = setInterval(() => {
      if (colorNum === 255) {
        type = '-'
      } else if (colorNum === 0) {
        type = '+'
      }
      if (type === '-') colorNum--
      if (type === '+') colorNum++

      material.color.set(`rgb(${colorNum}, 0, 0)`)
    }, 100)
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    camera.position.z = 5
    const animate = () => {
      // 最適なタイミングでコールバック関数を実行
      requestAnimationFrame(animate)
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      // canvasに描写
      renderer.render(scene, camera)
    }
    animate()
    return () => {
      clearInterval(timeId)
      clearInterval(timeId2)
    }
  }, [])

  return (
    <>
      <canvas ref={canvas} />
    </>
  )
}

export default Sample01
