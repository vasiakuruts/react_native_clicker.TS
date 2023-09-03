export interface IControllsProps {
  clickerPower: number;
  onClickerClick: () => void;
  onControllClick: (controll: string) => void;
  controlls: IControls;
  canSumGenerators: boolean;
}

export interface IControls {
  generator?: {
    someField?: boolean;
    anotherField?: boolean;
  };
}
