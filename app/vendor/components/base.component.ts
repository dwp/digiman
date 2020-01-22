import ComponentProperties from '../interfaces/component-properties.interface';

export abstract class BaseComponent {
  protected selector : string;
  protected config : any;
  protected container : HTMLElement;

  constructor(params : ComponentProperties, element : HTMLElement) {
    this.selector = params.selector;
    this.config = params.config || {};
    this.container = element;
  }
}
