varying vec2 vUv;
varying vec3 vWorldPosition;

uniform sampler2D uAlpha;
uniform sampler2D uColorMap;
uniform sampler2D uPerlin;

void main() {

  float alpha = texture2D(uAlpha, vUv).r;
  alpha = smoothstep(0.9, 1.0, alpha);

  vec2 globalUv = vWorldPosition.xz * 0.1; 

  float noice = texture2D(uPerlin, globalUv * 0.1).r;
  
  vec3 colorVar = vec3(0.0, 0.0, 0.0);
  vec3 textureColor = texture2D(uColorMap, vUv).rgb;


  vec3 color = mix(textureColor, colorVar, noice);

  gl_FragColor = vec4(color, alpha);


}