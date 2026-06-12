export type Chipset = "AMD" | "Intel" | null;
export type Category =
  | "PC CASE"
  | "MOTHERBOARDS"
  | "PROCESSORS"
  | "MEMORY"
  | "COOLERS"
  | "GRAPHICS CARDS"
  | "SSD & NVME"
  | "EXTRA SSD & NVME"
  | "HARD DISK"
  | "EXTRA HARD DISK"
  | "POWER SUPPLY"
  | "FANS";

export type Part = {
  id: string;
  name: string;
  price: number;
  specs: string;
  compatibility: "AMD" | "Intel" | "Universal";
  image?: string;
};
