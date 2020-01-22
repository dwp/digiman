import { State } from '../interfaces/state.interface';
import { DefinitionMeta } from '../interfaces/definition-meta.interface';

function parseJSON(value: any): State[] | DefinitionMeta[] {
  let json = value;
  if (typeof json === 'string') {
    json = JSON.parse(json);
  }
  return json;
}

export default {
  parseJSON
}