'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Home() {
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
    // 立方体を定義
    const geometry = new THREE.BoxGeometry()
    // マテリアルの作成
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    // メッシュの作成
    const cube = new THREE.Mesh(geometry, material)
    // シーンに追加
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

    }
  }, [])

  return (
    <>
      <canvas ref={canvas}></canvas>
    </>
  )
}
