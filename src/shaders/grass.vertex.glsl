varying vec2 vUv;
varying vec3 vWorldPosition;

attribute vec3 aPositions;
attribute float aRandoms;

uniform float uTime;
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
  vec3 axis = vec3(0.0, 1.0, 0.0);

  vec3 cameraDirection = normalize(uCameraPosition - localPosition);
  float angle = 180.0;

  localPosition = rotate_vertex_position(localPosition, axis, angle);

  vec3 newPosition = localPosition + aPositions;

  newPosition.y *= aRandoms;
  newPosition.x += sin(uTime + (aRandoms + 1.5)) * uv.y;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

  vec3 worldPosition = vec3(modelMatrix * vec4(position + aPositions, 1.0));

  vUv = uv;
  vWorldPosition = worldPosition.xyz;
}