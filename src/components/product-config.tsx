import { useRef, useState } from "react";
import Modal from "./modal";
import { Input } from "./ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "motion/react";

type Config = {
  name: string;
  tubeTypes: string;
  type: string;
  productSource: string;
  description: string;
  isAutoReplenish: boolean;
};

// type SubConfig = {
//   configName: string;
//   vendor: string;
//   type: string;
//   prePrint: boolean;
//   pkunit: string;
//   pkunitqty: string;
// };

const ProductConfig = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<Config[]>([]);
  const [openSubConfig, setOpenIsSubConfig] = useState(false);
  const [currentProduct, setCurrentProduct] = useState("");

  const formRef = useRef(null);

  const createNewConfig = (productName: string) => {
    setCurrentProduct(productName);
    setOpenIsSubConfig(true);
  };

  const saveProduct = () => {
    if (!formRef.current) return;
    // @ts-ignore
    const formElements = formRef.current.querySelectorAll<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
      | HTMLInputElement
    >("input, textarea");

    const newConfig: Config = {
      name: "",
      tubeTypes: "",
      type: "",
      productSource: "",
      description: "",
      isAutoReplenish: false,
    };
    // @ts-ignore
    formElements.forEach((el) => {
      if (el.id in newConfig) {
        if (el.type === "checkbox") {
          // @ts-ignore
          newConfig[el.id as keyof Config] = (el as HTMLInputElement).checked;
        } else {
          // @ts-ignore
          newConfig[el.id as keyof Config] = el.value;
        }
      }
    });

    setConfig((prev) => [...prev, newConfig]);
    setIsOpen(false);
    toast.success("Event has been created", {
      description: `Successfully created ${newConfig.name}`,
      action: {
        label: "Create Config",
        onClick: () => {
          setOpenIsSubConfig(true), setCurrentProduct(newConfig.name);
        },
      },
    });
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className="grow"
    >
      <button
        onClick={() => setIsOpen(true)}
        className="border-2 rounded-md p-2 m-2 bg-black text-white font-medium hover:bg-white hover:text-black duration-150 ease-in-out cursor-pointer"
      >
        New Product
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2">Create New Product</h2>
          <div ref={formRef} className="grid grid-cols-2 gap-2">
            <div className="grid w-full max-w-sm items-center">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" />
            </div>
            <div className="grid w-full max-w-sm items-center">
              <Label htmlFor="tubeTypes">Tube Types</Label>
              <Input id="tubeTypes" type="text" />
            </div>
            <div className="grid w-full max-w-sm items-center">
              <Label htmlFor="type">Type</Label>
              <Input id="type" type="text" />
            </div>
            <div className="grid w-full max-w-sm items-center">
              <Label htmlFor="productSource">Product Source</Label>
              <Input id="productSource" type="text" />
            </div>
            <div className="col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Type your message here."
              />
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="isAutoReplenish" />
              <Label htmlFor="isAutoReplenish">Auto Replenish</Label>
            </div>
          </div>
        </div>
        <button
          onClick={saveProduct}
          className="border-2 p-2 rounded-md float-right font-medium cursor-pointer hover:bg-stone-200 duration-150 ease-in-out"
        >
          Create
        </button>
      </Modal>

      <Modal isOpen={openSubConfig} onClose={() => setOpenIsSubConfig(false)}>
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2">{`Create new for ${currentProduct}`}</h2>
          <div ref={formRef} className="grid grid-cols-2 gap-2">
            <div className="grid w-full max-w-sm items-center">
              <Label htmlFor="configName">Config Name</Label>
              <Input id="configName" type="text" />
            </div>
            <div className="grid w-full max-w-sm items-center">
              <Label htmlFor="vendor">Vendor</Label>
              <Input id="vendor" type="text" />
            </div>
            <div className="grid w-full max-w-sm items-center">
              <Label htmlFor="type">Type</Label>
              <Input id="type" type="text" />
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="preprint" />
              <Label htmlFor="preprint">Preprint</Label>
            </div>
            <div className="col-span-2">
              <Label htmlFor="pkunit">Pk unit</Label>
              <Input id="pkunit" type="number" />
            </div>
            <div className="col-span-2">
              <Label htmlFor="pkquantity">Pkq uantity</Label>
              <Input id="pkquantity" type="number" />
            </div>
          </div>
        </div>
        <button
          onClick={saveProduct}
          className="border-2 p-2 rounded-md float-right font-medium cursor-pointer hover:bg-stone-200 duration-150 ease-in-out"
        >
          Create
        </button>
      </Modal>
      <Toaster theme="dark" />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Tube Types</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Product Source</TableHead>
            <TableHead>description</TableHead>
            <TableHead>Auto Replenish</TableHead>
            <TableHead>View Config</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {config.map((product) => (
            <TableRow key={product.name}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.tubeTypes}</TableCell>
              <TableCell>{product.type}</TableCell>
              <TableCell>{product.productSource}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.isAutoReplenish ? "✅" : "❌"}</TableCell>
              <TableCell
                className="cursor-pointer"
                onClick={() => createNewConfig(product.name)}
              >
                📝
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default ProductConfig;
