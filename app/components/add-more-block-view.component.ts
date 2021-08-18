import { createElement } from "../vendor/utils/index.utils";
import { AddMoreBlock } from "../subcomponents/add-more-block.component";
import blockBuilder from "../services/block-builder.service";
import { ValueBlock } from "../subcomponents/value-block.component";

export class AddMoreBlockView {
  createView(addMoreBlock: AddMoreBlock): HTMLElement {
    let elementNode = createElement(`<div id="id-add-more-${addMoreBlock.id}"></div>`);

    let fieldsetsNode: Array<HTMLElement> = this.createFieldsets(addMoreBlock);

    fieldsetsNode.forEach((fieldsetNode: HTMLElement) => elementNode.append(fieldsetNode));

    if (!addMoreBlock.readOnly) {
      elementNode.append(addMoreBlock.addMoreButton);
    }
    
    addMoreBlock.htmlNode = elementNode;
    addMoreBlock.addEvents();

    return elementNode;
  }

  createFieldsets(addMoreBlock: AddMoreBlock) {
    let fieldsetNodes: Array<HTMLElement> = [];
    
    addMoreBlock.blocks.forEach((block: Array<ValueBlock>, index: number) => {
      let fieldsetNode: HTMLElement;
      const id = addMoreBlock.id;

      fieldsetNode = this.createFieldset(id, index + 1);

      block.forEach(valueBlock => {
        fieldsetNode.append(blockBuilder(valueBlock));
      });

      if (!addMoreBlock.readOnly && index > 0) {
        fieldsetNode.append(addMoreBlock.createRemoveButton(id, index + 1));
      }
      
      fieldsetNodes.push(fieldsetNode);
    });

    return fieldsetNodes;
  }

  createAddMoreButton(id: string) {
    return createElement(`<input id="add-more-button-${id}" type="button" value="Add another" class="button button-secondary add-more__add-button" data-add-more-id="${id}" />`);
  }

  createRemoveButton(id: string, index: number) {
    return createElement(`<button class="govuk-body link-style add-more__remove-button" type="button" aria-controls="id-add-more-${id}-${index}" data-remove-number="${index}">Remove <span class="visuallyhidden">set of inputs ${index}</span></button>`);
  }

  createFieldset(id: string, index: number) {
    return createElement(`<fieldset id="id-add-more-${id}-${index}" class="govuk-fieldset digiman__add-more-fieldset"></fieldset>`);
  }
}