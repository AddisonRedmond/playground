import { useState } from "react";
import Nav from "./components/nav";
import Ribbon from "./components/ribbon";
import ProductConfig from "./components/product-config";
import { AnimatePresence, motion } from "motion/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export type SubConfigItem = {
  parentName: string;
  configName: string;
  vendor: string;
  type: string;
  prePrint: boolean;
  pkunit: string;
  pkunitqty: string;
};

export type Config = {
  name: string;
  tubeTypes: string;
  type: string;
  productSource: string;
  description: string;
  isAutoReplenish: boolean;
};
const SubConfigList: React.FC<{ data: SubConfigItem[] }> = ({ data }) => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className="grow"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Preprint</TableHead>
            <TableHead>pk unit</TableHead>
            <TableHead>pk quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((config) => (
            <TableRow key={config.parentName}>
              <TableCell className="font-medium">{config.parentName}</TableCell>
              <TableCell>{config.vendor}</TableCell>
              <TableCell>{config.type}</TableCell>
              <TableCell>{config.prePrint}</TableCell>
              <TableCell>{config.pkunit}</TableCell>
              <TableCell>{config.pkunitqty}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
};

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [subConfigs, setSubConfigs] = useState<SubConfigItem[]>([]);
  const [config, setConfig] = useState<Config[]>([]);
  console.log(config);

  console.log(subConfigs);
  return (
    <div className="h-screen w-screen flex flex-col">
      <Ribbon />
      <div className="grow flex">
        <Nav path={path} setPath={setPath} />
        <AnimatePresence>
          {path === "/reports" && (
            <ProductConfig
              setSubConfigs={setSubConfigs}
              config={config}
              setConfig={setConfig}
            />
          )}
          {path === "/product" && <SubConfigList data={subConfigs} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
