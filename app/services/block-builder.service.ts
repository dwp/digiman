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
import select from '../views/select.view.mustache';
import { BlockType } from '../enums/block-type.enum';
import { ValueBlock } from '../subcomponents/value-block.component';
import { ContentBlock } from '../subcomponents/content-block.component';
import { DateBlock } from '../subcomponents/date-block.component';
import { createElement } from '../vendor/utils/index.utils';
import { SelectBlock } from '../subcomponents/select-block.component';
import { CheckboxBlock } from '../subcomponents/checkbox-block.component';
import { RadioBlock } from '../subcomponents/radio-block.component';
import { DecisionRadioBlock } from '../subcomponents/decision-radio-block.component';
import { DecisionCheckboxBlock } from '../subcomponents/decision-checkbox-block.component';

export default function blockBuilder(block: (ValueBlock | CheckboxBlock | RadioBlock | ContentBlock | DecisionRadioBlock | DecisionCheckboxBlock | DateBlock | SelectBlock)) {

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
    case BlockType.SELECT:
      component = template(select, block);
      break;
    default:
      component = null;
  }

  return createElement(component);
}