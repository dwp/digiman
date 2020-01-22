import { createElement } from '../index.utils';

export default function parseTemplate(templateString: string, substitutes = {}, returnString = false) {
  for (const [KEY, VALUE] of Object.entries(substitutes)) {
    templateString = templateString.replace(new RegExp(`{${KEY}}`, 'g'), VALUE as any);
  }

  return returnString ? templateString : createElement(templateString);
}
