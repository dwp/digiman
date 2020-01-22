import { FormBlockInterface } from './form-block.interface';

export interface DateBlockInterface extends FormBlockInterface {
  day: string,
  month: string,
  year: string,
  value: number
}