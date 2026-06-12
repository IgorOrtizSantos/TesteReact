export type Product = {
  name: string;
  image: string;
  model: string;
  treadwear: number;
  traction: string;
  temperature: string;
  pattern: string;
  loadIndex: string;
  speedRating: string;
  noise: number;
  rollingResistance: string;
  wetGrip: string;
  cars: string[];
};

export const SEARCHABLE_FIELDS: SearchableProductFields[] = [
  "name",
  "model",
  "treadwear",
  "traction",
  "temperature",
  "pattern",
  "loadIndex",
  "speedRating",
  "noise",
  "rollingResistance",
  "wetGrip",
  "cars",
];

export type SearchableProductFields =
  | "name"
  | "model"
  | "treadwear"
  | "traction"
  | "temperature"
  | "pattern"
  | "loadIndex"
  | "speedRating"
  | "noise"
  | "rollingResistance"
  | "wetGrip"
  | "cars";

export type ProductDisplayField = {
  key: keyof Product;
  label: string;
};

export const PRODUCT_DISPLAY_FIELDS: ProductDisplayField[] = [
  { key: "treadwear", label: "Durabilidade" },
  { key: "traction", label: "Tração" },
  { key: "temperature", label: "Temperatura" },
  { key: "speedRating", label: "Velocidade" },
  { key: "loadIndex", label: "Carga" },
  { key: "pattern", label: "Desenho" },
];

