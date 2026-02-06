export interface IGeneratorItem {
  price: number;
  level: number;
}
export interface IGeneratorsProps {
  handleClick: (generatorsIndex: number) => void;
  generators: IGeneratorItem[];
}

