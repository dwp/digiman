import { AddMoreBlockView } from '../../app/components/add-more-block-view.component';
import { AddMoreBlock } from '../../app/subcomponents/add-more-block.component';

describe('AddMoreBlockView', () => {
  let block;
  const READ_ONLY = true;
  const EDITABLE = false;
  const addMoreBlockView = new AddMoreBlockView();

  let addMoredata = (readOnly) => {
    return {
      readOnly: readOnly,
      type: "ADD_MORE",
      id: "qb-end_add-more",
      blocks: [
        {
          type: "TEXT_INPUT",
          id: "qb-end_add-more1",
          label: "First"
        },
        {
          type: "TEXT_INPUT",
          id: "qb-end_add-more2",
          label: "Second"
        },
        {
          type: "TEXT_INPUT",
          id: "qb-end_add-more3",
          label: "Third"
        }
      ]
    }
  };

  afterEach(() => {
    block = null;
  });

  describe('When createFieldset is called', () => {
    it('Then createFieldset has correct HTML', () => {
      expect(addMoreBlockView.createFieldset('123', 123).outerHTML).toBe('<fieldset id="id-add-more-123-123" class="govuk-fieldset digiman__add-more-fieldset"></fieldset>');
    });
  });

  describe('When createAddMoreButton is called', () => {
    it('Then createAddMoreButton has correct HTML', () => {
      expect(addMoreBlockView.createAddMoreButton('123').outerHTML).toBe('<input id="add-more-button-123" type="button" value="Add another" class="button button-secondary add-more__add-button" data-add-more-id="123">');
    });
  });

  describe('When createRemoveButton is called', () => {
    it('Then createRemoveButton has correct HTML', () => {
      expect(addMoreBlockView.createRemoveButton('123', 123).outerHTML).toBe('<button class="govuk-body link-style add-more__remove-button" type="button" aria-controls="id-add-more-123-123" data-remove-number="123">Remove <span class="visuallyhidden">set of inputs 123</span></button>');
    });
  });

  describe('When createFieldsets is called with Editable addMoreComponent', () => {
    beforeEach(() => {
      block = new AddMoreBlock(addMoredata(EDITABLE));
      block.setState([[{ "id": "qb-end_add-more1--1", "value": "123" }, { "id": "qb-end_add-more2--1", "value": "234" }, { "id": "qb-end_add-more3--1", "value": "345" }], [{ "id": "qb-end_add-more1--2", "value": "456" }, { "id": "qb-end_add-more2--2", "value": "567" }, { "id": "qb-end_add-more3--2", "value": "678" }], [{ "id": "qb-end_add-more1--3", "value": "sdfsd" }, { "id": "qb-end_add-more2--3", "value": "sdf" }, { "id": "qb-end_add-more3--3", "value": "sdf" }]]);
    });

    it('Then 3 fieldsets are created with corect ids', () => {
      const node = addMoreBlockView.createFieldsets(block);
      expect(node[0].id).toBe('id-add-more-qb-end_add-more-1');
      expect(node[1].id).toBe('id-add-more-qb-end_add-more-2');
      expect(node[2].id).toBe('id-add-more-qb-end_add-more-3');
    });

    it('And Labels for first fildset inputs are correct', () => {
      const node = addMoreBlockView.createFieldsets(block);

      expect(node[0].querySelector('label[for="qb-end_add-more1--1"]').textContent.trim()).toBe('First (1)');
      expect(node[0].querySelector('label[for="qb-end_add-more2--1"]').textContent.trim()).toBe('Second (1)');
      expect(node[0].querySelector('label[for="qb-end_add-more3--1"]').textContent.trim()).toBe('Third (1)');
    });

    it('And Labels for second fildset inputs are correct', () => {
      const node = addMoreBlockView.createFieldsets(block);

      expect(node[1].querySelector('label[for="qb-end_add-more1--2"]').textContent.trim()).toBe('First (2)');
      expect(node[1].querySelector('label[for="qb-end_add-more2--2"]').textContent.trim()).toBe('Second (2)');
      expect(node[1].querySelector('label[for="qb-end_add-more3--2"]').textContent.trim()).toBe('Third (2)');
    });

    it('And Labels for third fildset inputs are correct', () => {
      const node = addMoreBlockView.createFieldsets(block);

      expect(node[2].querySelector('label[for="qb-end_add-more1--3"]').textContent.trim()).toBe('First (3)');
      expect(node[2].querySelector('label[for="qb-end_add-more2--3"]').textContent.trim()).toBe('Second (3)');
      expect(node[2].querySelector('label[for="qb-end_add-more3--3"]').textContent.trim()).toBe('Third (3)');
    });

    it('And inputs for first fieldset are created', () => {
      const node = addMoreBlockView.createFieldsets(block);

      expect(node[0].querySelector('#qb-end_add-more1--1')).not.toBe(null);
      expect(node[0].querySelector('#qb-end_add-more2--1')).not.toBe(null);
      expect(node[0].querySelector('#qb-end_add-more3--1')).not.toBe(null);
    });

    it('And inputs for second fieldset are created', () => {
      const node = addMoreBlockView.createFieldsets(block);

      expect(node[1].querySelector('#qb-end_add-more1--2')).not.toBe(null);
      expect(node[1].querySelector('#qb-end_add-more2--2')).not.toBe(null);
      expect(node[1].querySelector('#qb-end_add-more3--2')).not.toBe(null);
    });

    it('And inputs for third fieldset are created', () => {
      const node = addMoreBlockView.createFieldsets(block);

      expect(node[2].querySelector('#qb-end_add-more1--3')).not.toBe(null);
      expect(node[2].querySelector('#qb-end_add-more2--3')).not.toBe(null);
      expect(node[2].querySelector('#qb-end_add-more3--3')).not.toBe(null);
    });

    it('And first fieldset does not have remove button', () => {
      const node = addMoreBlockView.createFieldsets(block);

      expect(node[0].querySelector('.add-more__remove-button')).toBe(null);
    });

    it('And second and third fieldset do have remove button', () => {
      const node = addMoreBlockView.createFieldsets(block);

      expect(node[1].querySelector('.add-more__remove-button')).not.toBe(null);
      expect(node[2].querySelector('.add-more__remove-button')).not.toBe(null);
    });
  });

  describe('When createFieldsets is called with ReadOnly addMoreComponent', () => {
    beforeEach(() => {
      block = new AddMoreBlock(addMoredata(READ_ONLY));
      block.setState([[{ "id": "qb-end_add-more1--1", "value": "123" }, { "id": "qb-end_add-more2--1", "value": "234" }, { "id": "qb-end_add-more3--1", "value": "345" }], [{ "id": "qb-end_add-more1--2", "value": "456" }, { "id": "qb-end_add-more2--2", "value": "567" }, { "id": "qb-end_add-more3--2", "value": "678" }], [{ "id": "qb-end_add-more1--3", "value": "sdfsd" }, { "id": "qb-end_add-more2--3", "value": "sdf" }, { "id": "qb-end_add-more3--3", "value": "sdf" }]]);
    });

    it('Then 3 fieldsets are created with corect ids', () => {
      const node = addMoreBlockView.createFieldsets(block);
      expect(node[0].id).toBe('id-add-more-qb-end_add-more-1');
      expect(node[1].id).toBe('id-add-more-qb-end_add-more-2');
      expect(node[2].id).toBe('id-add-more-qb-end_add-more-3');
    });

    it('And Labels for first fildset inputs are correct', () => {
      const node = addMoreBlockView.createFieldsets(block);

      expect(node[0].querySelector('#id-section-qb-end_add-more1--1 .govuk-fieldset__legend').textContent.trim()).toBe('First (1)');
      expect(node[0].querySelector('#id-section-qb-end_add-more2--1 .govuk-fieldset__legend').textContent.trim()).toBe('Second (1)');
      expect(node[0].querySelector('#id-section-qb-end_add-more3--1 .govuk-fieldset__legend').textContent.trim()).toBe('Third (1)');
    });

    it('And Labels for second fildset inputs are correct', () => {
      const node = addMoreBlockView.createFieldsets(block);

      expect(node[1].querySelector('#id-section-qb-end_add-more1--2 .govuk-fieldset__legend').textContent.trim()).toBe('First (2)');
      expect(node[1].querySelector('#id-section-qb-end_add-more2--2 .govuk-fieldset__legend').textContent.trim()).toBe('Second (2)');
      expect(node[1].querySelector('#id-section-qb-end_add-more3--2 .govuk-fieldset__legend').textContent.trim()).toBe('Third (2)');
    });

    it('And Labels for third fildset inputs are correct', () => {
      const node = addMoreBlockView.createFieldsets(block);

      expect(node[2].querySelector('#id-section-qb-end_add-more1--3 .govuk-fieldset__legend').textContent.trim()).toBe('First (3)');
      expect(node[2].querySelector('#id-section-qb-end_add-more2--3 .govuk-fieldset__legend').textContent.trim()).toBe('Second (3)');
      expect(node[2].querySelector('#id-section-qb-end_add-more3--3 .govuk-fieldset__legend').textContent.trim()).toBe('Third (3)');
    });

    it('And inputs for first fieldset are created', () => {
      const node = addMoreBlockView.createFieldsets(block);

      expect(node[0].querySelector('#qb-end_add-more1--1')).not.toBe(null);
      expect(node[0].querySelector('#qb-end_add-more2--1')).not.toBe(null);
      expect(node[0].querySelector('#qb-end_add-more3--1')).not.toBe(null);
    });

    it('And inputs for second fieldset are created', () => {
      const node = addMoreBlockView.createFieldsets(block);

      expect(node[1].querySelector('#qb-end_add-more1--2')).not.toBe(null);
      expect(node[1].querySelector('#qb-end_add-more2--2')).not.toBe(null);
      expect(node[1].querySelector('#qb-end_add-more3--2')).not.toBe(null);
    });

    it('And inputs for third fieldset are created', () => {
      const node = addMoreBlockView.createFieldsets(block);

      expect(node[2].querySelector('#qb-end_add-more1--3')).not.toBe(null);
      expect(node[2].querySelector('#qb-end_add-more2--3')).not.toBe(null);
      expect(node[2].querySelector('#qb-end_add-more3--3')).not.toBe(null);
    });

    it('And all fieldset do have remove button', () => {
      const node = addMoreBlockView.createFieldsets(block);

      expect(node[0].querySelector('.add-more__remove-button')).toBe(null);
      expect(node[1].querySelector('.add-more__remove-button')).toBe(null);
      expect(node[2].querySelector('.add-more__remove-button')).toBe(null);
    });
  });

  describe('When createView is called with Editable addMoreComponent', () => {
    beforeEach(() => {
      block = new AddMoreBlock(addMoredata(EDITABLE));
    });

    it('Then an element with id "id-add-more-qb-end_add-more" is created', () => {
      expect(addMoreBlockView.createView(block).id).toBe('id-add-more-qb-end_add-more')
    });

    it('And the fieldset is present in DOM', () => {
      const node = addMoreBlockView.createView(block);

      expect(node.querySelector('#id-add-more-qb-end_add-more-1')).not.toBe(null);
    });

    it('And Labels for first fildset inputs are correct', () => {
      const node = addMoreBlockView.createView(block);

      expect(node.querySelector('label[for="qb-end_add-more1--1"]').textContent.trim()).toBe('First (1)');
      expect(node.querySelector('label[for="qb-end_add-more2--1"]').textContent.trim()).toBe('Second (1)');
      expect(node.querySelector('label[for="qb-end_add-more3--1"]').textContent.trim()).toBe('Third (1)');
    });

    it('And 3 inputs are created', () => {
      const node = addMoreBlockView.createView(block);

      expect(node.querySelector('#qb-end_add-more1--1')).not.toBe(null);
      expect(node.querySelector('#qb-end_add-more2--1')).not.toBe(null);
      expect(node.querySelector('#qb-end_add-more3--1')).not.toBe(null);
    });

    it('And add more button is created', () => {
      const node = addMoreBlockView.createView(block);

      expect(node.querySelector('#add-more-button-qb-end_add-more')).not.toBe(null);
    });
  });

  describe('When createView is called with ReadOnly addMoreComponent', () => {
    beforeEach(() => {
      block = new AddMoreBlock(addMoredata(READ_ONLY));
    });

    it('Then an element with id "id-add-more-qb-end_add-more" is created', () => {
      expect(addMoreBlockView.createView(block).id).toBe('id-add-more-qb-end_add-more')
    });

    it('And the fieldset is present in DOM', () => {
      const node = addMoreBlockView.createView(block);

      expect(node.querySelector('#id-add-more-qb-end_add-more-1')).not.toBe(null);
    });

    it('And headings for first fildset inputs are correct', () => {
      const node = addMoreBlockView.createView(block);
      expect(node.querySelector('#id-section-qb-end_add-more1--1 .govuk-fieldset__legend').textContent.trim()).toBe('First (1)');
      expect(node.querySelector('#id-section-qb-end_add-more2--1 .govuk-fieldset__legend').textContent.trim()).toBe('Second (1)');
      expect(node.querySelector('#id-section-qb-end_add-more3--1 .govuk-fieldset__legend').textContent.trim()).toBe('Third (1)');
    });

    it('And 3 answer paragraphs are created', () => {
      const node = addMoreBlockView.createView(block);

      expect(node.querySelector('#qb-end_add-more1--1.digiman__value-input--read-only')).not.toBe(null);
      expect(node.querySelector('#qb-end_add-more2--1.digiman__value-input--read-only')).not.toBe(null);
      expect(node.querySelector('#qb-end_add-more3--1.digiman__value-input--read-only')).not.toBe(null);
    });

    it('And add more button is not created', () => {
      const node = addMoreBlockView.createView(block);

      expect(node.querySelector('#add-more-button-qb-end_add-more')).toBe(null);
    });
  });
});