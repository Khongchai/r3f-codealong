import { Canvas, useFrame } from "@react-three/fiber";
import * as React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import { Image } from "./Components/Image";
import img1 from "./images/blue-swirl.jpg";
import img2 from "./images/light-blue-swirl.jpg";
import disp from "./images/pattern.jpg";

function Box(props: any) {
  // This reference will give us direct access to the THREE.Mesh object
  const mesh = React.useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => ((mesh.current as any).rotation.x += 0.01));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

ReactDOM.render(
  <Canvas style={{ width: "100vw", height: "100vh" }}>
    <React.Suspense fallback={null}>
      <Image url1={img1} url2={img2} disp={disp} />
    </React.Suspense>
  </Canvas>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
