'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const Sample06 = () => {
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

    renderer.setClearColor(0xf3f3f3)

    const mapRand = (min: number, max: number, isInt: boolean = false) => {
      let rand = Math.random() * (max - min) + min
      rand = isInt ? Math.round(rand) : rand
      return rand
    }

    const meshes = [], MESH_NUM = 50, POS_RANGE = 100, MAX_SCALE = 1.5

    const randomMesh = () => {
      const geometries = [
        new THREE.BoxGeometry(10, 10, 10),
        new THREE.PlaneGeometry(20, 20),
        new THREE.TorusGeometry(10, 3, 200, 20)
      ]
      const color = new THREE.Color(
        mapRand(0.7, 1),
        mapRand(0.7, 1),
        mapRand(0.7, 1)
      )
      const pos = {
        x: mapRand(-POS_RANGE, POS_RANGE),
        y: mapRand(-POS_RANGE, POS_RANGE),
        z: mapRand(-POS_RANGE, POS_RANGE)
      }
      const material = new THREE.MeshBasicMaterial({
        color
      })
      const gIndex = mapRand(0, geometries.length - 1, true)
      const mesh = new THREE.Mesh(geometries[gIndex], material)
      mesh.position.set(pos.x, pos.y, pos.z)
      const scale = mapRand(1, MAX_SCALE)
      mesh.geometry.scale(scale, scale, scale)
      return mesh
    }

    for (let i = 0; i < MESH_NUM; i++) {
      const mesh = randomMesh()
      meshes.push(mesh)
    }

    scene.add(...meshes)

    const axis = new THREE.AxesHelper(20)
    scene.add(axis)
    camera.position.z = 30
    // @ts-ignore
    const control = new OrbitControls(camera, canvas.current)
    const animate = () => {
      // 最適なタイミングでコールバック関数を実行
      requestAnimationFrame(animate)
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

export default Sample06
