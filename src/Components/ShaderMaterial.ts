import * as THREE from "three";
import { extend } from "@react-three/fiber";

export default class Fade extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        //@ts-ignore
        effectFactor: { type: "f", value: 1.2 },
        //@ts-ignore
        dispFactor: { type: "f", value: 0 },
        utexture: { value: undefined },
        utexture2: { value: undefined },
        disp: { value: undefined },
      },
      vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          }`,
      fragmentShader: `
          varying vec2 vUv;
          uniform sampler2D utexture;
          uniform sampler2D utexture2;
          uniform sampler2D disp;
          uniform float dispFactor;
          uniform float effectFactor;
          void main() {
                vec2 uv = vUv;
                vec4 disp = texture2D(disp, uv);
                vec2 distortedPosition = vec2(uv.x , uv.y + dispFactor * (disp.r*effectFactor));
                vec4 _texture = texture2D(utexture, distortedPosition);
                vec2 distortedPosition2 = vec2(uv.x, uv.y - (1.0 - dispFactor) * (disp.r*effectFactor));
                vec4 _texture2 = texture2D(utexture2, distortedPosition2);
                vec4 finalTexture = mix(_texture, _texture2, dispFactor);
            gl_FragColor = vec4(0.0);
          }`,
    });
  }

  get utexture() {
    return this.uniforms.utexture.value;
  }
  set utexture(v) {
    this.uniforms.utexture.value = v;
  }
  get utexture2() {
    return this.uniforms.utexture2.value;
  }
  set utexture2(v) {
    this.uniforms.utexture2.value = v;
  }
  get disp() {
    return this.uniforms.disp.value;
  }
  set disp(v) {
    this.uniforms.disp.value = v;
  }
  get dispFactor() {
    return this.uniforms.dispFactor.value;
  }
  set dispFactor(v) {
    this.uniforms.dispFactor.value = v;
  }
}

// register element in r3f (<fade />)
extend({ Fade });
