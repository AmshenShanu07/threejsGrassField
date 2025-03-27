import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import Cube from './Cube';
import Grass from './Grass';


class World {
  clock = new THREE.Clock();
  sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2)
  }


  constructor() {
    this._init();    
    this._animate();

    addEventListener('resize', () => this._onResize());
  }

  _init () {
    this.canvas = document.querySelector('canvas.webgl');
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.01, 10000);
    
    // this.camera.position.x = 5;
    this.camera.position.y = 4;
    this.camera.position.z = 25;
    // this.camera.position.y = 15;
    // this.camera.position.z = 25;

    this.scene.add(this.camera);

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.setClearColor(0x20272F, 1);
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);

    // this.cubeMesh = new Cube();
    // this.scene.add(this.cubeMesh.init());

    this.grassMesh = new Grass();
    this.scene.add(this.grassMesh.init());

    this.floor = new THREE.Mesh(
      new THREE.PlaneGeometry(70, 70),
      new THREE.MeshBasicMaterial({ color: 0x3A3405 })
    )
    this.floor.rotation.x = Math.PI * -0.5;
    this.floor.position.z = 15;
    this.scene.add(this.floor)


    const geometry = new THREE.CapsuleGeometry( 0.5, 2, 3, 8 );
    const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
    const capsule = new THREE.Mesh( geometry, material ); 
    capsule.position.y = 1;
    this.scene.add(capsule);
 
  }

  _onResize() {
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;
    this.sizes.pixelRatio = Math.min(window.devicePixelRatio, 2);

    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  }

  _animate() {
    requestAnimationFrame(() => this._animate());
    const elapsedTime = this.clock.getElapsedTime();

    this.grassMesh.update(elapsedTime, this.camera.position);
    // this.cubeMesh.update();

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

}

export default World;