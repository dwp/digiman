import { Block } from './block.component';
import { AddMoreBlockInterface } from '../interfaces/add-more-block.interface';
import { ValueBlock } from './value-block.component';
import { BlockType } from '../enums/block-type.enum';
import { createElement, delegateEvent } from '../vendor/utils/index.utils';
import { ValueBlockInterface } from '../interfaces/value-block.interface';
import { ValueInterface } from '../interfaces/value.interface';


export class AddMoreBlock extends Block {
  private _blocks: Array<Array<ValueBlock>>;
  private _blocksData: Array<ValueBlockInterface>;
  private _id: string;
  private _readOnly: boolean;
  private _itemsCount: number;
  private addMoreButton: HTMLElement;

  constructor(data: AddMoreBlockInterface) {
    super(data.type as BlockType);

    this._blocks = [];
    this._blocksData = data.blocks;
    this._id = data.id;
    this._readOnly = data.readOnly;
    this._itemsCount = 1;

    this._blocks.push(this._createBlocks(this._blocksData));
    this.cacheElements();

    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.htmlNode = this._createView();
    this.addEvents();
  }

  get id(): string {
    return this._id;
  }

  get blocksData() {
    return this._blocksData;
  }

  set blocks(newblocks: Array<Array<ValueBlock>>) {
    this._blocks = newblocks;
  }

  get blocks() {
    return this._blocks;
  }

  get readOnly() {
    return this._readOnly;
  }

  set itemsCount(newItemsCount: number) {
    this._itemsCount = newItemsCount;
  }

  get itemsCount() {
    return this._itemsCount;
  }

  get value(): Array<Array<ValueInterface>> {
    let valuesArray: Array<Array<ValueInterface>> = [];

    this.blocks.forEach(blockArray => {
      const values: Array<ValueInterface> = [];
      blockArray.forEach(block => {
        values.push({ 'id': block.id, 'value': block.value });
      });
      valuesArray.push(values);
    });

    return valuesArray;
  }

  getChildById(id: string): ValueBlock {
    let block = null;
    for (let i=0; i<this.blocks.length; i++) {
      block = this.blocks[i].find(bl => bl.id === id);
      if (block) {
        break;
      }
    }
    return block;
  }

  handleClick(e: Event) {
    e.preventDefault();

    this.addAnotherItem();
    this.focusFirstInputOfSet(this.itemsCount);
  }

  focusFirstInputOfSet(setNumber: number) {
    const input: HTMLInputElement = this.htmlNode.querySelector(`#${this._blocksData[0].id}--${setNumber}`);
    input.focus();
  }

  addAnotherItem() {
    this.itemsCount++;
    const parent = this.addMoreButton.parentNode;
    const newBlocks = this._createBlocks(this.blocksData);

    this.blocks.push(newBlocks);

    const fieldsetNode = createElement(`<fieldset id="id-add-more-${this.id}-${this.itemsCount}" class="govuk-fieldset digiman__add-more-fieldset"></fieldset>`);
    for (let block of newBlocks) {
      fieldsetNode.append(block.htmlNode);
    }
    const removeButtonNode = createElement(`<button class="govuk-body link-style add-more__remove-button" 
                                                    type="button"
                                                    aria-controls="id-add-more-${this.id}-${this.itemsCount}" 
                                                    data-remove-number="${this.itemsCount}">Remove <span class="visuallyhidden">set of inputs ${this.itemsCount}</span>
                                            </button>`);
    fieldsetNode.append(removeButtonNode);

    parent.insertBefore(fieldsetNode, this.addMoreButton);
  }

  addEvents() {
    this.addMoreButton.addEventListener('click', this.handleClick);
    delegateEvent(this.htmlNode, 'click', '.add-more__remove-button', this.handleRemoveClick);
  }

  handleRemoveClick(e: Event) {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const number = parseInt(target.dataset.removeNumber);
    const fieldsetIndex = number-1;
    const fieldset = this.htmlNode.querySelector(`#id-add-more-${this.id}-${number}`);
    fieldset.remove();
    this.itemsCount--;

    if (fieldsetIndex < this.itemsCount) {
      this.blocks.splice(fieldsetIndex, 1);

      this.blocks.forEach((valueArray: Array<ValueBlock>, index: number) => {
        const fieldsetNode: HTMLElement = this.htmlNode.querySelector(`#id-add-more-${this.id}-${index+2}`);
        if (fieldsetNode) {
          fieldsetNode.remove();
        }
        if (index >= fieldsetIndex) {
          valueArray.forEach((childValue, inputIndex) => {
            childValue.id = `${this.id}${inputIndex+1}--${index+1}`;
            childValue.label = childValue.label.replace(/\((.*)\)/, `(${index+1})`);
          });
        } 
      });

      const value = JSON.parse(JSON.stringify(this.value));

      this.blocks.length = 1;
      this.itemsCount = 1;

      this.setState(value);

      this.focusFirstInputOfSet(number);
    } else {
      this.blocks.pop();
      this.addMoreButton.focus();
    }
  }

  cacheElements() {
    this.addMoreButton = createElement(`<input type="button" value="Add another" class="button button-secondary add-more__add-button" data-add-more-id="${this.id}" />`);
  }
  
  setChildState(value: string, id: string) {
    let valueBlock: ValueBlock = null;
      
    this.blocks.forEach(blockArray => {
      const block = blockArray.find(block => block.id === id);
      if (block) {
        valueBlock = block;
      }
    });

    if (valueBlock) {
      valueBlock.setState(value as string);
    }
  }

  setState(value: Array<Array<ValueInterface>>) {
    //update all from state on page load
    for(let i=1;i<value.length;i++) {
      this.addAnotherItem();
    }

    const groupArray = value as Array<Array<ValueInterface>>;
    groupArray.forEach((valueArray: Array<ValueInterface>) => {
      valueArray.forEach(childValue => {
        const valueBlock = this.getChildById(childValue.id);
        valueBlock.setState(childValue.value);
      });
    });
  }

  resetState() {
    this.blocks = [];
    this.itemsCount = 1;
    this.blocks.push(this._createBlocks(this.blocksData));
    this.htmlNode = this._createView();
  }

  _createBlocks(blocks: Array<ValueBlockInterface>): Array<ValueBlock> {
    const blockArray: Array<ValueBlock> = [];
    const blocksClone = JSON.parse(JSON.stringify(blocks));
 
    blocksClone.forEach((block: ValueBlockInterface) => {
      block.id = `${block.id}--${this.itemsCount}`;
      block.label = `${block.label} (${this.itemsCount})`;
      block.readOnly = this.readOnly;
      blockArray.push(new ValueBlock(block as ValueBlockInterface));
    });

    return blockArray;
  }

  _createView(): HTMLElement {
    let elementNode = createElement(`<div id="id-add-more-${this.id}"></div>`);

    const fieldsetNode = createElement(`<fieldset id="id-add-more-${this.id}-1" class="govuk-fieldset digiman__add-more-fieldset"></fieldset>`);
    for (let block of this.blocks) {
      block.forEach(valueBlock => {
        fieldsetNode.append(valueBlock.htmlNode);
      });
    }

    elementNode.append(fieldsetNode);
    
    elementNode.append(this.addMoreButton);

    return elementNode;
  }
}
