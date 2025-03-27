varying vec2 vUv;
varying vec3 vWorldPosition;

attribute vec3 aPositions;
attribute float aRandoms;

uniform float uTime;
uniform sampler2D uPerlin;
uniform vec3 uCameraPosition;

vec4 quat_from_axis_angle(vec3 axis, float angle){ 
    vec4 qr;
    float half_angle = (angle * 0.5) * 3.14159 / 180.0;
    qr.x = axis.x * sin(half_angle);
    qr.y = axis.y * sin(half_angle);
    qr.z = axis.z * sin(half_angle);
    qr.w = cos(half_angle);
    return qr;
}

vec3 rotate_vertex_position(vec3 position, vec3 axis, float angle){
    vec4 q = quat_from_axis_angle(axis, angle);
    vec3 v = position.xyz;
    return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
}

void main () {

  vec3 localPosition = position;

  // Rotate the grass to face the camera
  vec3 axis = vec3(0.0, 1.0, 0.0);
  vec3 cameraDirection = normalize(uCameraPosition - localPosition);
  float angle = atan(cameraDirection.x, cameraDirection.z) * 180.0 / 3.14159;
  localPosition = rotate_vertex_position(localPosition, axis, angle);

  // Positioning the grass
  vec3 newPosition = localPosition + aPositions;


  // Applying wind effect
  vec3 worldPosition = vec3(modelMatrix * vec4(position + aPositions, 1.0));

  vec2 globalUv = worldPosition.xz * 0.1; 
  globalUv.x += uTime * 0.5;
  globalUv.y += uTime * 0.5;
  float noice = texture2D(uPerlin, globalUv * 0.1).r;
  newPosition.y *= aRandoms;
  newPosition.x += ((noice - 0.5) * 2.0) * uv.y;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);


  vUv = uv;
  vWorldPosition = worldPosition.xyz;
}