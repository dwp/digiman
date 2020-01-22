import { OptionInterface } from './option.interface';
import { FormBlockInterface } from './form-block.interface';

export interface OptionBlockInterface extends FormBlockInterface {
  options: OptionInterface[]
}