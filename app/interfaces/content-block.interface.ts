import { BlockInterface } from './block.interface';

export interface ContentBlockInterface extends BlockInterface {
  content: string | string[]
}