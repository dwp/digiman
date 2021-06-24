import { QuestionSectionViewFactory } from '../../app/components/question-section-view-factory.component';
import { QuestionSection } from '../../app/subcomponents/question-section.component';

describe('QuestionSectionViewFactory', () => {
  let block;
  const READ_ONLY = true;
  const EDITABLE = false;
  const questionSectionViewFactory = new QuestionSectionViewFactory();

  let data = (readOnly) => {
    return {
      "id": "qb-start-id",
      "digimanId": "digimanId",
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

  const htmlOutput = questionSectionViewFactory.createView(new QuestionSection(data(EDITABLE)));
  const readOnlyHtmlOutput = questionSectionViewFactory.createView(new QuestionSection(data(READ_ONLY)));

  afterEach(() => {
    block = null;
  });

  describe('When createView is called', () => {
    it('Then html output contains container with "digimanId__qb-start-id" id', () => {
      expect(htmlOutput.id).toBe('digimanId__qb-start-id');
    });

    it('And html contains HINT', () => {
      expect(htmlOutput.innerHTML.includes('<p class="govuk-hint text">Paragraph of page level hint.</p>')).toBeTruthy();
    });

    it('And html contains PARAGRAPH', () => {
      expect(htmlOutput.innerHTML.includes('<p class="govuk-body text">Paragraph of text.</p>')).toBeTruthy();
    });

    it('And html contains IMPORTANT', () => {
      expect(htmlOutput.innerHTML.includes('<p class="govuk-inset-text text">Important information paragraph.</p>')).toBeTruthy();
    });

    it('And html contains DATE', () => {
      expect(htmlOutput.querySelector('#id-section-qb-start-id_date-id')).not.toBe(null);
    });

    it('And html contains INPUT', () => {
      expect(htmlOutput.querySelector('#id-section-qb-start-id_input-id')).not.toBe(null);
    });

    it('And html contains ADD_MORE', () => {
      expect(htmlOutput.querySelector('#id-add-more-qb-start-id_add-more')).not.toBe(null);
    });

    it('And html contains DECISION BLOCK RADIO', () => {
      expect(htmlOutput.querySelector('#id-section-qb-start-id_decision')).not.toBe(null);
    });
  });

  describe('When createView is called with READ ONLY', () => {
    it('Then html output contains container with "digimanId__qb-start-id" id', () => {
      expect(readOnlyHtmlOutput.id).toBe('digimanId__qb-start-id');
    });

    it('And html contains HINT', () => {
      expect(readOnlyHtmlOutput.innerHTML.includes('<p class="govuk-hint text">Paragraph of page level hint.</p>')).toBeTruthy();
    });

    it('And html contains PARAGRAPH', () => {
      expect(readOnlyHtmlOutput.innerHTML.includes('<p class="govuk-body text">Paragraph of text.</p>')).toBeTruthy();
    });

    it('And html contains IMPORTANT', () => {
      expect(readOnlyHtmlOutput.innerHTML.includes('<p class="govuk-inset-text text">Important information paragraph.</p>')).toBeTruthy();
    });

    it('And html contains DATE', () => {
      expect(readOnlyHtmlOutput.querySelector('#id-section-qb-start-id_date-id')).not.toBe(null);
    });

    it('And html contains INPUT', () => {
      expect(readOnlyHtmlOutput.querySelector('#id-section-qb-start-id_input-id')).not.toBe(null);
    });

    it('And html contains ADD_MORE', () => {
      expect(readOnlyHtmlOutput.querySelector('#id-add-more-qb-start-id_add-more')).not.toBe(null);
    });

    it('And html contains DECISION BLOCK RADIO', () => {
      expect(readOnlyHtmlOutput.querySelector('#id-section-qb-start-id_decision')).not.toBe(null);
    });
  });
});