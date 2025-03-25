import * as THREE from 'three';

class Cube {
  
  init() {
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshNormalMaterial();
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    return this.mesh
  }
  

  update() {
    this.mesh.rotation.y += 0.01;
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.z += 0.01;
  }
}

export default Cube;