import * as THREE from 'three';
import vertexShader from '../shaders/grass.vertex.glsl';
import fragmentShader from '../shaders/grass.fragment.glsl';

class Grass {
  instance = 50000;
  textureLoader = new THREE.TextureLoader();

  init() {
    this.positions = [];
    this.indexs = [];
    this.uvs = [];
    this.aRandoms = [];

    this.aPositions = [];

    this.positions.push(-0.15, 0, 0);
    this.positions.push(0.15, 0, 0);
    this.positions.push(0, 1, 0);

    this.indexs.push(0, 1, 2);
    // this.indexs.push(0, 2, 3);
    
    this.uvs.push(0, 0);
    this.uvs.push(1, 0);
    this.uvs.push(1, 1);
    // this.uvs.push(0, 1);

    let step = 0;
    
    for (let i = 0; i < this.instance * 3; i++) {

      const rowCount = 128;
      const pos = i % rowCount;

      let posX = pos - (0.5 * pos) ;
      let posY = 1;

      posX -= rowCount / 4;
      posX += Math.random() * 0.5 - 0.25;

      if(pos === 0) {
        step += 0.15;
      }
      
      this.aPositions.push(posX);
      this.aPositions.push(posY);
      this.aPositions.push(step - rowCount/8 + Math.random() * 0.1 - 0.05);
      
      this.aRandoms.push(Math.random() * (1 - 0.5) + 0.5)

    }


    
    this.geometry = new THREE.InstancedBufferGeometry();
    this.geometry.instanceCount = this.instance;

    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(this.positions, 3));
    this.geometry.setAttribute('uv', new THREE.Float32BufferAttribute(this.uvs, 2));
    this.geometry.setAttribute('aPositions', new THREE.InstancedBufferAttribute(new Float32Array(this.aPositions), 3));
    this.geometry.setAttribute('aRandoms', new THREE.InstancedBufferAttribute(new Float32Array(this.aRandoms), 1));

    this.geometry.setIndex(new THREE.Uint16BufferAttribute(this.indexs, 1));

    const perlinTexture = this.textureLoader.load('./perlin.png'); // Load the texture
    perlinTexture.wrapS = perlinTexture.wrapT = THREE.RepeatWrapping;
    // perlinTexture.minFilter = THREE.LinearFilter;

    this.material = new THREE.ShaderMaterial({
      transparent: true,
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: new THREE.Uniform(0),
        uAlpha: new THREE.Uniform(this.textureLoader.load('./alpha.png')),
        uColorMap: new THREE.Uniform(this.textureLoader.load('./colorMap.png')),
        uPerlin: new THREE.Uniform(perlinTexture),
        uCameraPosition: new THREE.Uniform(new THREE.Vector3(0.0)),
      }
    });
    
    return new THREE.Mesh(this.geometry, this.material);

  }

  update(time, cameraPos) {
    
    this.material.uniforms.uTime.value = time;
    this.material.uniforms.uCameraPosition.value = cameraPos;
    
  }

}


export default Grass;
