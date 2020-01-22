import { Block } from '../subcomponents/block.component';
const Mustache = require('mustache');

export default function template(template: string, config: Block) {
  return Mustache.render(template, config);
}


