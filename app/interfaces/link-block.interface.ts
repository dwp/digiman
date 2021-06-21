import { BlockInterface } from './block.interface';

export interface LinkBlockInterface extends BlockInterface {
  text: string,
  url: string
}