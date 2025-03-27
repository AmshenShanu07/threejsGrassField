varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vNormal;

uniform sampler2D uAlpha;
uniform sampler2D uColorMap;
uniform sampler2D uPerlin;
uniform float uTime;

void main() {

  float alpha = texture2D(uAlpha, vUv).r;
  alpha = smoothstep(0.9, 1.0, alpha);

  vec2 globalUv = vWorldPosition.xz * 0.1; 

  // globalUv.x += (uTime * 0.1);
  // globalUv.y -= (uTime * 0.1);

  float noice = texture2D(uPerlin, globalUv * 0.1).r;
  
  vec3 colorOne = vec3(0.27, 0.36, 0.04) * vUv.y;
  vec3 colorVar = vec3(0.55, 0.49, 0.05);
  vec3 textureColor = texture2D(uColorMap, vUv).rgb;


  vec3 color = mix(colorOne, colorVar, noice);

  gl_FragColor = vec4(color, alpha);

}