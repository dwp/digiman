import { ValueBlock } from '../subcomponents/value-block.component';
import { BlockInterface } from './block.interface';

export interface AddMoreBlockInterface extends BlockInterface {
  blocks: Array<ValueBlock>,
  id: string,
  readOnly: boolean
}