import { QuestionSection } from '../../app/subcomponents/question-section.component';
import { FormBlock } from '../../app/subcomponents/form-block.component';
import { DecisionBlock } from '../../app/subcomponents/decision-block.component';
import { ContentBlock } from '../../app/subcomponents/content-block.component';

describe('QuestionSection', () => {
  let qs, contentBlock, view;
  const READ_ONLY = true;
  const EDITABLE = false;
  let data = (readOnly) => {
    return {
      "id" : "qb-start-id",
      "title": "Title",
      "readOnly": readOnly,
      "contents" : [
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
          "id" : "qb-start-id_date-id",
          "label": "Date Label",
          "help": "Date hint text"
        },
        {
          "id" : "qb-start-id_input-id",
          "type": "TEXT_INPUT",
          "label": "Input Label",
          "help": "Input hint text"
        }
      ],
      "question" : {
        "id": "qb-start-id_decision",
        "type" : "RADIO",
        "label" : "Where would you like to go?",
        "options" : [
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

    it('Then 4 content blocks are defined', () => {
      expect(qs.contentBlocks.length).toBe(5);
    });

    it('And decision block is defined', () => {
      expect(qs.decisionBlock instanceof DecisionBlock).toBe(true);
    });

    it('And id of question section is qb-start-id', () => {
      expect(qs.id).toBe('qb-start-id');
    });

    it('And readOnly is set to false', () => {
      expect(qs.readOnly).toBe(false);
    });

    it('And html of question section contains decision block section html', () => {
      expect(qs.html.includes(`id="id-section-qb-start-id_decision"`)).toBe(true);
    });

    it('And html of question section contains paragraph block html', () => {
      expect(qs.html.includes(`<p class="govuk-body text">Paragraph of text.</p>`)).toBe(true);
    });

    it('And html of question section contains day input for date block html', () => {
      expect(qs.html.includes(`id="qb-start-id_date-id.day"`)).toBe(true);
    });

    it('And html of question section contains month input for date block html', () => {
      expect(qs.html.includes(`id="qb-start-id_date-id.month"`)).toBe(true);
    });

    it('And html of question section contains year input for date block html', () => {
      expect(qs.html.includes(`id="qb-start-id_date-id.year"`)).toBe(true);
    });

    it('And html of question section contains hint block html', () => {
      expect(qs.html.includes(`<p class="govuk-hint text">Paragraph of page level hint.</p>`)).toBe(true);
    });

    it('And html of question section contains paragraph block html', () => {
      expect(qs.html.includes(`<p class="govuk-body text">Paragraph of text.</p>`)).toBe(true);
    });

    it('And html of question section contains important information block html', () => {
      expect(qs.html.includes(`<p class="govuk-inset-text text">Important information paragraph.</p>`)).toBe(true);
    });

    describe('When getContentBlockById is called with existing ID:qb-start-id_input-id', () => {
      beforeEach(() => {
        contentBlock = qs.getContentBlockById('qb-start-id_input-id');
      });

      it('Then content block with ID:qb-start-id_input-id is retrieved', () => {
        expect(contentBlock.id).toBe('qb-start-id_input-id');
      });

      it('And block is of type FormBlock', () => {
        expect(contentBlock  instanceof FormBlock).toBe(true);
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
          updateView: () => {}
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

    describe('When _createView is called', () => {
      beforeEach(() => {
        qs._contentBlocks = [];
        qs._createContentBlocks([{ id: 'test-id', type: 'TEXT_INPUT' }, { content: 'test', type: 'PARAGRAPH' }]);
        qs._digimanId = 'test-id';
        view = qs._createView();
      });

      it('Then _createView returns question section html', () => {
        expect(view.includes(`<div class="question-section" id="test-id__qb-start-id" data-current-state="qb-start-id" data-next-state="" data-selected-option-id="">`)).toBe(true);
      });

      it('And updated html does not match getter method', () => {
        expect(view).not.toEqual(qs.html);
      });

      it('And updated html does not contain old paragraph block', () => {
        expect(view.includes(`<p class="text">Paragraph of text.</p>`)).toBe(false);
      });

      it('And updated html does contain new paragraph block', () => {
        expect(view.includes(`<p class="govuk-body text">test</p>`)).toBe(true);
      });

    });

    describe('When updateView is called', () => {
      beforeEach(() => {
        qs._contentBlocks = [];
        qs._createContentBlocks([{ id: 'test-id', type: 'TEXT_INPUT' }, { content: 'test', type: 'PARAGRAPH' }]);
        qs._digimanId = 'test-id';
        view = qs._createView();

        qs.updateView();
      });

      it('Then _createView returns question section html', () => {
        expect(view.includes(`<div class="question-section" id="test-id__qb-start-id" data-current-state="qb-start-id" data-next-state="" data-selected-option-id="">`)).toBe(true);
      });

      it('And updated html does match getter method', () => {
        expect(view).toEqual(qs.html);
      });

      it('And updated html does not contain old paragraph block', () => {
        expect(view.includes(`<p class="text">Paragraph of text.</p>`)).toBe(false);
      });

      it('And updated html does contain new paragraph block', () => {
        expect(view.includes(`<p class="govuk-body text">test</p>`)).toBe(true);
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
                                  updateView: () => {}
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
