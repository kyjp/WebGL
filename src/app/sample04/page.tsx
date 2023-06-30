'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const Sample04 = () => {
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
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // 軸の出し方
    const axis = new THREE.AxesHelper()
    scene.add(axis)

    // HTMLElementしか入らなかったので次の行のtsエラーを無視
    // @ts-ignore
    const control = new OrbitControls(camera, canvas.current)

    camera.position.z = 5
    const animate = () => {
      // 最適なタイミングでコールバック関数を実行
      requestAnimationFrame(animate)
      // 回転
      // mesh.rotation.y += 0.01
      // mesh.rotateX(0.02)

      // 平行移動
      // mesh.position.x += 0.01
      // あまりパフォーマンスが良くない書き方
      // geometry.translate(0.01, 0.01, 0.01)

      // スケール
      // mesh.scale.x += 0.02
      // mesh.scale.y += 0.02
      geometry.scale(1.02, 1.02, 1.02)

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

export default Sample04
