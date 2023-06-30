'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const Sample02 = () => {
  const canvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!canvas) return
    // シーンを作成
    const init = async() => {
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
      const geometry = new THREE.PlaneGeometry(20, 10)
      //テクスチャを作成
      const textLoader = new THREE.TextureLoader()
      // テクスチャをロード
      const texture = await textLoader.loadAsync('stone_00006.jpg')
      const texture02 = await textLoader.loadAsync('stone_00010.jpg')
      // テクスチャを設定
      const material = new THREE.MeshBasicMaterial({
        map: texture
      })
      // テクスチャの切り替え
      setTimeout(async () => {
        material.map = texture02
      }, 2000);

      const cube = new THREE.Mesh(geometry, material)
      scene.add(cube)
      camera.position.z = 50
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
    }
    init()
  }, [])

  return (
    <>
      <canvas ref={canvas} />
    </>
  )
}

export default Sample02
