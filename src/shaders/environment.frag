uniform vec3 uTopColor;
uniform vec3 uBottomColor;
uniform vec3 uSpot1Color;
uniform vec3 uSpot2Color;
uniform vec2 uSpot1Position;
uniform vec2 uSpot2Position;

varying vec2 vUv;

float distanceFromPoint(vec2 uv, vec2 point, float max){
  float d = distance(uv, point);
  d = smoothstep(0.0, max, d);
  d = 1.0 - d;
  return d;
}

void main() {

  float d1 = distanceFromPoint(vUv, vec2(uSpot1Position), 0.3);
  float d2 = distanceFromPoint(vUv, vec2(uSpot2Position), 0.4);

  vec4 colorSpot1 = vec4(uSpot1Color, 1.0 * d1 * 0.8);
  vec4 colorSpot2 = vec4(uSpot2Color, 1.0  * d2 * 0.8);
  vec4 verticalGradient = vec4(mix(uBottomColor,uTopColor, vUv.y), 1.0);
  vec4 mixVS1 = mix(verticalGradient, colorSpot1, colorSpot1.a);
  vec4 final = mix(mixVS1, colorSpot2, colorSpot2.a);

	gl_FragColor = vec4(final.rgb, 1.0);
}
