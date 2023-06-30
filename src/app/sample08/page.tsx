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

    const meshes: any = [], MESH_NUM = 50, POS_RANGE = 100, MAX_SCALE = 1.5, TARGET_MESH_NUM = 10

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
      const material = new THREE.MeshLambertMaterial({
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

    const amlight = new THREE.AmbientLight(0xe4e4e4)
    scene.add(amlight)

    // ライトの設置 色、強度、高さ
    const light1 = new THREE.PointLight(0xe4e4e4, 1, 400)
    light1.position.set(10, 100, 110)
    const helper1 = new THREE.PointLightHelper(light1)
    helper1.visible = false
    const light2 = new THREE.PointLight(0xeeeeee, 1, 300)
    light2.position.set(-100, -100, 200)
    const helper2 = new THREE.PointLightHelper(light2)
    helper2.visible = false
    scene.add(light1, helper1, light2, helper2)
    let i: number = 0


    function getAction({ x, y, z }: { [props: string]: number }) {
      const rand = mapRand(0.7, 1.3)
      const ACTIONS = [
        function () {
          const direction = x < 0 ? rand : -rand
          // @ts-ignore
          this.position.x += direction
        },
        function () {
          const direction = y < 0 ? rand : -rand
          // @ts-ignore
          this.position.y += direction
        },
        function () {
          const direction = z < 0 ? rand : -rand
          // @ts-ignore
          this.position.z += direction
        }
      ]
      const action = ACTIONS[mapRand(0, ACTIONS.length - 1, true)]
      return action
    }

    // 物体の移動
    let targetMeshes: any = []
    setInterval(() => {
      targetMeshes.forEach((mesh: any) => mesh.__action  = null)
      targetMeshes = []
      for (let index = 0; index < TARGET_MESH_NUM; index++) {
        const mesh: THREE.Mesh<THREE.BoxGeometry | THREE.PlaneGeometry | THREE.TorusGeometry, THREE.MeshLambertMaterial> | any = meshes[mapRand(0, meshes.length - 1, true)]
        mesh.__action = getAction(mesh.position)
        targetMeshes.push(mesh)
      }
    }, 2000)

    const animate = () => {
      // 最適なタイミングでコールバック関数を実行
      requestAnimationFrame(animate)
      targetMeshes.forEach((mesh: any) => mesh.__action())
      if (POS_RANGE > camera.position.z) {
        camera.position.z += 0.03
      }
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
