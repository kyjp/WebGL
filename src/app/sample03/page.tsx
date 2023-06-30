'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const Sample03 = () => {
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

    // ドーナツの作成時に使用
    const geometry = new THREE.TorusGeometry()

    const material = new THREE.MeshBasicMaterial({
      color: 'yellow'
    })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    // HTMLElementしか入らなかったので次の行のtsエラーを無視
    // @ts-ignore
    const control = new OrbitControls(camera, canvas.current)
    // 慣性の追加
    control.enableDamping = true
    control.autoRotate = true

    camera.position.z = 5
    const animate = () => {
      // 最適なタイミングでコールバック関数を実行
      requestAnimationFrame(animate)
      // 慣性を追加したときのみ必要
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

export default Sample03
