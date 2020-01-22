import { BlockInterface } from './block.interface';

export interface FormBlockInterface extends BlockInterface {
  id: string,
  hint: string,
  label: string,
  readOnly: boolean
}