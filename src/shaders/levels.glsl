vec4 gammaCorrect(vec4 color, float gamma){
  return pow(color, vec4(1.0 / gamma));
}

vec4 levelRange(vec4 color, float minInput, float maxInput){
  return min(max(color - vec4(minInput), vec4(0.0)) / (vec4(maxInput) - vec4(minInput)), vec4(1.0));
}

vec4 levels(vec4 color, float minInput, float gamma, float maxInput){
  return gammaCorrect(levelRange(color, minInput, maxInput), gamma);
}

#pragma glslify: export(levels);