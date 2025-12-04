import { useState } from "react";
import Nav from "./components/nav";
import Ribbon from "./components/ribbon";
import ProductConfig from "./components/product-config";
import { AnimatePresence } from "motion/react";

function App() {
  const [path, setPath] = useState(window.location.pathname);
  console.log(path);
  return (
    <div className="h-screen w-screen flex flex-col">
      <Ribbon />
      <div className="grow flex">
        <Nav path={path} setPath={setPath} />
        <AnimatePresence>
          {path === "/reports" && <ProductConfig />}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
