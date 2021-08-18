import { Block } from './block.component';
import { AddMoreBlockInterface } from '../interfaces/add-more-block.interface';
import { ValueBlock } from './value-block.component';
import { BlockType } from '../enums/block-type.enum';
import { delegateEvent } from '../vendor/utils/index.utils';
import { ValueBlockInterface } from '../interfaces/value-block.interface';
import { ValueInterface } from '../interfaces/value.interface';
import blockBuilder from '../services/block-builder.service';
import { AddMoreBlockView } from '../components/add-more-block-view.component';


export class AddMoreBlock extends Block {
  private _blocks: Array<Array<ValueBlock>>;
  private _blocksData: Array<ValueBlockInterface>;
  private _id: string;
  private _readOnly: boolean;
  private _itemsCount: number;
  private _addMoreButton: HTMLElement;
  private _htmlNode: HTMLElement;
  private addMoreBlockView: AddMoreBlockView = new AddMoreBlockView();

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

  get addMoreButton() {
    return this._addMoreButton;
  }

  get htmlNode() {
    return this._htmlNode;
  }

  set htmlNode(htmlNode: HTMLElement) {
    this._htmlNode = htmlNode;
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
    const parent = this._addMoreButton.parentNode;
    const newBlocks = this._createBlocks(this.blocksData);

    this._blocks.push(newBlocks);

    const fieldsetNode = this.addMoreBlockView.createFieldset(this.id, this.itemsCount);
    for (let block of newBlocks) {
      fieldsetNode.append(blockBuilder(block));
    }

    const removeButtonNode = this.createRemoveButton(this.id, this.itemsCount);
    
    fieldsetNode.append(removeButtonNode);

    parent.insertBefore(fieldsetNode, this._addMoreButton);
  }

  createRemoveButton(id: string, index: number) {
     return this.addMoreBlockView.createRemoveButton(id, index);
  }

  addEvents() {
    this._addMoreButton.addEventListener('click', this.handleClick);
    delegateEvent(this.htmlNode, 'click', '.add-more__remove-button', this.handleRemoveClick);
  }

  handleRemoveClick(e: Event) {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const number = parseInt(target.dataset.removeNumber);
    const fieldsetIndex = number-1;
    const blockLength = this.blocks.length;
    const fieldset = this.htmlNode.querySelector(`#id-add-more-${this.id}-${number}`);
    fieldset.remove();
    this.itemsCount--;

    if (fieldsetIndex < this.itemsCount) {
      for (let i=0; i<blockLength; i++) {
        const fieldsetNode: HTMLElement = this.htmlNode.querySelector(`#id-add-more-${this.id}-${i+1}`);
        if (fieldsetNode) {
          fieldsetNode.remove();
        }
      }

      this.blocks.splice(fieldsetIndex, 1);

      this.blocks.forEach((valueArray: Array<ValueBlock>, index: number) => {
        if (index >= fieldsetIndex) {
          valueArray.forEach((childValue, inputIndex) => {
            childValue.id = `${this.id}${inputIndex+1}--${index+1}`;
            childValue.label = childValue.label.replace(/\((.*)\)/, `(${index+1})`);
          });
        }
      });

      const value = JSON.parse(JSON.stringify(this.value));

      this.setState(value);

      const allFieldsets = this.addMoreBlockView.createFieldsets(this);
      allFieldsets.forEach(fieldset => this._htmlNode.insertBefore(fieldset, this._addMoreButton));
      
      this.focusFirstInputOfSet(number);
    } else {
      this.blocks.pop();
      this._addMoreButton.focus();
    }
  }

  cacheElements() {
    this._addMoreButton = this.addMoreBlockView.createAddMoreButton(this.id);
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
    this._blocks = [];
    this.itemsCount = 0;

    value.forEach((v) => {
      this.itemsCount++;
      this._blocks.push(this._createBlocks(this.blocksData)); 
    });

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
}
