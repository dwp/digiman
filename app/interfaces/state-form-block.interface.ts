import { ValueInterface } from "./value.interface";

export interface StateFormBlock {
  id: string,
  value: string | number | Array<Array<ValueInterface>>
}