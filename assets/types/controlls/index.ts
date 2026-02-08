export interface IControllsProps {
  clickerPower: number;
  onClickerClick: () => void;
  onControllClick: (controll: string) => void;
  controlls: IControls;
  canSumGenerators: boolean;
  titleOne: string;
  titleTwo: string;
}

export interface IControls {
  generator?: {
    someField?: boolean;
    anotherField?: boolean;
  };
}
