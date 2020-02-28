import template from '../utils/template.utils';
import radio from '../views/radio.view.mustache';
import checkbox from '../views/checkbox.view.mustache';
import text from '../views/text.view.mustache';
import date from '../views/date.view.mustache';
import textarea from '../views/textarea.view.mustache';
import list from '../views/list.view.mustache';
import listOrdered from '../views/list-ordered.view.mustache';
import hint from '../views/hint.view.mustache';
import important from '../views/important.view.mustache';
import paragraph from '../views/paragraph.view.mustache';
import heading from '../views/heading.view.mustache';
import { BlockType } from '../enums/block-type.enum';
import { ValueBlock } from '../subcomponents/value-block.component';
import { OptionBlock } from '../subcomponents/option-block.component';
import { ContentBlock } from '../subcomponents/content-block.component';
import { DecisionBlock } from '../subcomponents/decision-block.component';
import { DateBlock } from '../subcomponents/date-block.component';
import { createElement } from '../vendor/utils/index.utils';

export default function blockBuilder(block: (ValueBlock | OptionBlock | ContentBlock | DecisionBlock | DateBlock)) {

  let component: string;

  switch(block.type) {
    case BlockType.RADIO:
      component = template(radio, block);
      break;
    case BlockType.CHECKBOX:
      component = template(checkbox, block);
      break;
    case BlockType.TEXT_INPUT:
      component = template(text, block);
      break;
    case BlockType.DATE:
      component = template(date, block);
      break;
    case BlockType.TEXTAREA:
      component = template(textarea, block);
      break;
    case BlockType.BREAK:
      component = template('<br />', block);
      break;
    case BlockType.HINT:
      component = template(hint, block);
      break;
    case BlockType.IMPORTANT:
      component = template(important, block);
      break;
    case BlockType.LIST:
      component = template(list, block);
      break;
    case BlockType.LIST_ORDERED:
      component = template(listOrdered, block);
      break;
    case BlockType.PARAGRAPH:
      component = template(paragraph, block);
      break;
    case BlockType.HEADING:
      component = template(heading, block);
      break;
    default:
      component = null;
  }

  return createElement(component);
}