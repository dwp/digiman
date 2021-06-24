import { QuestionSection } from '../../app/subcomponents/question-section.component';
import { FormBlock } from '../../app/subcomponents/form-block.component';
import { ContentBlock } from '../../app/subcomponents/content-block.component';
import { DecisionRadioBlock } from '../../app/subcomponents/decision-radio-block.component';

describe('QuestionSection', () => {
  let qs, contentBlock, view;
  const READ_ONLY = true;
  const EDITABLE = false;
  let data = (readOnly) => {
    return {
      "id": "qb-start-id",
      "title": "Title",
      "readOnly": readOnly,
      "contents": [
        {
          "type": "HINT",
          "content": "Paragraph of page level hint."
        },
        {
          "type": "PARAGRAPH",
          "content": "Paragraph of text."
        },
        {
          "type": "IMPORTANT",
          "content": "Important information paragraph."
        },
        {
          "type": "DATE",
          "id": "qb-start-id_date-id",
          "label": "Date Label",
          "help": "Date hint text"
        },
        {
          "id": "qb-start-id_input-id",
          "type": "TEXT_INPUT",
          "label": "Input Label",
          "help": "Input hint text"
        },
        {
          "type": "ADD_MORE",
          "id": "qb-start-id_add-more",
          "blocks": [
            {
              "type": "TEXT_INPUT",
              "id": "qb-start-id_add-more1",
              "label": "First"
            },
            {
              "type": "TEXT_INPUT",
              "id": "qb-start-id_add-more2",
              "label": "Second"
            },
            {
              "type": "TEXT_INPUT",
              "id": "qb-start-id_add-more3",
              "label": "Third",
              "hint": "Hint"
            }
          ]
        },
        {
          "type": "SELECT",
          "readOnly": false,
          "id": "qb-start-id_select-label_vvm6h04guf",
          "label": "Select label",
          "hint": "Select hint",
          "options": [
            {
              "value": "qb-start-id_select-label_vvm6h04guf_option-1_0",
              "text": "Option 1"
            },
            {
              "value": "qb-start-id_select-label_vvm6h04guf_option-2_1",
              "text": "Option 2"
            },
            {
              "value": "qb-start-id_select-label_vvm6h04guf_option-3_2",
              "text": "Select option 3"
            }
          ]
        }
      ],
      "question": {
        "id": "qb-start-id_decision",
        "type": "RADIO",
        "label": "Where would you like to go?",
        "options": [
          { "questionBlockId": "qb-question-id", "text": "Next question", "optionId": "next-id" },
          { "questionBlockId": "qb-end-no", "text": "End", "optionId": "end-id" }
        ]
      }
    }
  };

  afterEach(() => {
    qs = null;
    contentBlock = null;
    view = null;
  });

  describe('When question section is initialised', () => {
    beforeEach(() => {
      qs = new QuestionSection(data(EDITABLE));
    });

    it('Then 7 content blocks are defined', () => {
      expect(qs.contentBlocks.length).toBe(7);
    });

    it('And decision block is defined', () => {
      expect(qs.decisionBlock instanceof DecisionRadioBlock).toBe(true);
    });

    it('And id of question section is qb-start-id', () => {
      expect(qs.id).toBe('qb-start-id');
    });

    it('And readOnly is set to false', () => {
      expect(qs.readOnly).toBe(false);
    });

    describe('When getContentBlockById is called with existing ID:qb-start-id_input-id', () => {
      beforeEach(() => {
        contentBlock = qs.getContentBlockById('qb-start-id_input-id');
      });

      it('Then content block with ID:qb-start-id_input-id is retrieved', () => {
        expect(contentBlock.id).toBe('qb-start-id_input-id');
      });

      it('And block is of type FormBlock', () => {
        expect(contentBlock instanceof FormBlock).toBe(true);
      });
    });

    describe('When getContentBlockById is called with non-existing id', () => {
      beforeEach(() => {
        contentBlock = qs.getContentBlockById('qb-non-existing-id');
      });

      it('Then undefined is retrieved', () => {
        expect(contentBlock).toBe(undefined);
      });
    });

    describe('When resetAllFormBlocksState is called', () => {
      beforeEach(() => {
        spyOn(qs.decisionBlock, 'resetState');
        qs.resetAllFormBlocksState();
      });

      it('Then resetState of decisionBlock is called once', () => {
        expect(qs.decisionBlock.resetState).toHaveBeenCalledTimes(1);
      });
    });

    describe('When _createDecisionBlock is called', () => {
      beforeEach(() => {
        qs._createDecisionBlock({
          id: 'test-id',
          nextSection: 'string',
          selectedOptionId: 'string',
          options: [
            {
              text: 'string',
              questionBlockId: 'test',
            }
          ],
          hint: 'string',
          label: 'string',
          readOnly: false,
          type: "CHECKBOX",
          updateView: () => { }
        });
      });

      it('Then decision block is defined', () => {
        expect(qs.decisionBlock.id).toBe('test-id');
      });

      it('And decision block is editable', () => {
        expect(qs.decisionBlock.readOnly).toBe(false);
      });
    });

    describe('When _createContentBlocks is called', () => {
      beforeEach(() => {
        qs._contentBlocks = [];
        qs._createContentBlocks([{ id: 'test-id', type: 'TEXT_INPUT' }, { content: 'test', type: 'PARAGRAPH' }]);
      });

      it('Then content blocks array has 2 blocks', () => {
        expect(qs.contentBlocks.length).toBe(2);
      });

      it('And first content block is of type FormBlock', () => {
        expect(qs.contentBlocks[0] instanceof FormBlock).toBe(true);
      });

      it('And first content block of FormBlock type is editable', () => {
        expect(qs.contentBlocks[0].readOnly).toBe(false);
      });

      it('And second content block is of type ContentBlock', () => {
        expect(qs.contentBlocks[1] instanceof ContentBlock).toBe(true);
      });

      it('And second content block of type ContentBlock does not have readOnly property', () => {
        expect(qs.contentBlocks[1].readOnly).toBe(undefined);
      });
    });
  });

  describe('When question section is initialised with read only access', () => {
    beforeEach(() => {
      qs = new QuestionSection(data(READ_ONLY));
    });

    it('Then readOnly is set to true', () => {
      expect(qs.readOnly).toBe(true);
    });

    describe('When _createDecisionBlock is called', () => {
      beforeEach(() => {
        qs._createDecisionBlock({
          id: 'test-id',
          nextSection: 'string',
          selectedOptionId: 'string',
          options: [
            {
              text: 'string',
              questionBlockId: 'test',
            }
          ],
          hint: 'string',
          label: 'string',
          readOnly: false,
          type: "CHECKBOX",
          updateView: () => { }
        });
      });

      it('Then decision block is defined', () => {
        expect(qs.decisionBlock.id).toBe('test-id');
      });

      it('And decision block is read only', () => {
        expect(qs.decisionBlock.readOnly).toBe(true);
      });
    });

    describe('When _createContentBlocks is called', () => {
      beforeEach(() => {
        qs._contentBlocks = [];
        qs._createContentBlocks([{ id: 'test-id', type: 'TEXT_INPUT' }, { content: 'test', type: 'PARAGRAPH' }]);
      });

      it('Then first content block of FormBlock type is editable', () => {
        expect(qs.contentBlocks[0].readOnly).toBe(true);
      });

      it('And second content block of type ContentBlock does not have readOnly property', () => {
        expect(qs.contentBlocks[1].readOnly).toBe(undefined);
      });
    });

  });
});
