import stateService, { buildDataState, buildFormBlockState } from '../../app/services/state.service';
import { QuestionSection } from '../../app/subcomponents/question-section.component';

describe('State Service', () => {
  let state, formBlockState, questionSectionState, qs1, qs2;

  const qsOneConfig = {
    "id" : "qb-start-id",
    "title": "Title",
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
      }
    ],
    "question": {
      "type": "RADIO",
      "id": "qb-start-id_decision",
      "label": "Where would you like to go?",
      "options": [
        {
          "optionId": "qb-start-id_decision_next-question",
          "questionBlockId": "qb-question-id",
          "text": "Next question"
        },
        {
          "optionId": "qb-start-id_decision_ending",
          "questionBlockId": "qb-end-no",
          "text": "End"
        }
      ]
    }
  };

  const qsTwoConfig = {
    "id": "qb-question-id",
    "title": "Title",
    "contents": [
      {
        "type": "LIST",
        "content": [
          "List item one",
          "List item two"
        ]
      },
      {
        "type": "BREAK"
      },
      {
        "type": "TEXT_INPUT",
        "id": "qb-start-id_input-id",
        "label": "Input Label"
      },
      {
        "type": "TEXTAREA",
        "id": "qb-start-id_textarea-id",
        "label": "Textarea Label"
      },
      {
        "type": "CHECKBOX",
        "id": "qb-start-id_checkbox-id",
        "label": "Select any option",
        "options": [
          {
            "text": "ATM statement (cash point)",
            "value": "ATM"
          },
          {
            "text": "Bank card",
            "value": "card"
          },
          {
            "text": "Building society pass book",
            "value": "society"
          },
          {
            "text": "Cheque book",
            "value": "Cheque"
          },
          {
            "text": "Credit Union statement",
            "value": "CreditUnion"
          },
          {
            "text": "Other recent financial statements",
            "value": "Other"
          },
          {
            "text": "Official letter confirming account has recently been opened in the claimant's name",
            "value": "letter"
          },
          {
            "text": "Recent bank account statement",
            "value": "Recent"
          }
        ]
      },
      {
        "type": "RADIO",
        "id": "qb-start-id_radio-id",
        "label": "Select one option",
        "options": [
          {
            "text": "ATM statement (cash point)",
            "value": "ATM2"
          },
          {
            "text": "Bank card",
            "value": "card2"
          },
          {
            "text": "Building society pass book",
            "value": "society2"
          },
          {
            "text": "Cheque book",
            "value": "Cheque2"
          },
          {
            "text": "Credit Union statement",
            "value": "CreditUnion2"
          },
          {
            "text": "Other recent financial statements",
            "value": "Other2"
          },
          {
            "text": "Official letter confirming account has recently been opened in the claimant's name",
            "value": "letter2"
          },
          {
            "text": "Recent bank account statement",
            "value": "Recent2"
          }
        ]
      },
      {
        "type": "DATE",
        "id": "qb-start-id_date-id",
        "label": "Select one option",
        "hint": null
      }
    ],
    "question" : {
      "id": "qb-question-id_decision",
      "type" : "RADIO",
      "label" : "Action question block?",
      "options" : [
        { "questionBlockId": "qb-another-question-id", "text" : "Yes", "optionId": "test_yes"},
        { "questionBlockId": "qb-end-no", "text" : "No", "optionId": "test_no"},
        { "questionBlockId": "qb-another-question-id", "text" : "Maybe", "optionId": "test_maybe"}
      ]
    }
  };

  qs1 = new QuestionSection(qsOneConfig);
  qs2 = new QuestionSection(qsTwoConfig);

  //set state for blocks
  qs1.decisionBlock.setState('qb-question-id-qb-start-id_decision_next-question');

  qs2.getContentBlockById('qb-start-id_input-id').setState('Booja text input');
  qs2.getContentBlockById('qb-start-id_textarea-id').setState('Booja textarea');
  qs2.getContentBlockById('qb-start-id_checkbox-id').setState('society', true);
  qs2.getContentBlockById('qb-start-id_checkbox-id').setState('Cheque', true);
  qs2.getContentBlockById('qb-start-id_radio-id').setState('Cheque2', true);
  qs2.getContentBlockById('qb-start-id_date-id').setState(20001230);
  qs2.decisionBlock.setState('qb-another-question-id-test_maybe', true);
  let questionSections = [ qs1, qs2 ];

  afterEach(() => {
    formBlockState = null;
    questionSectionState = null;
    state = null;
  });

  describe('State Service builds the state', () => {
    beforeEach(() => {
      state = stateService(questionSections);
    });

    it('Then the returned array should have length 2', () => {
      expect(state.length).toBe(2);
    });

    it('Then the first item in the state array should have the correct format', () => {
      expect(state[0]).toEqual({
        answerId : 'qb-question-id',
        questionBlockId : 'qb-start-id',
        optionId: 'qb-start-id_decision_next-question'
      });
    });

    it('Then the second item in the state array should have the correct format', () => {
      expect(state[1]).toEqual(
        {
          questionBlockId: 'qb-question-id',
          answerId: 'qb-another-question-id',
          optionId: 'test_maybe',
          data: [
            { id: 'qb-start-id_input-id', value: 'Booja text input' },
            { id: 'qb-start-id_textarea-id', value: 'Booja textarea' },
            { id: 'qb-start-id_checkbox-id', value: 'society' },
            { id: 'qb-start-id_checkbox-id', value: 'Cheque' },
            { id: 'qb-start-id_radio-id', value: 'Cheque2' },
            { id: 'qb-start-id_date-id', value: 20001230 }
          ]
        }
      );
    });
  });

  describe('buildDataState is called with a questionSection containing no form blocks', () => {
    beforeEach(() => {
      questionSectionState = buildDataState(qs1);
    });

    it('Then the returned array should be empty', () => {
      expect(questionSectionState.length).toBe(0);
    });
  });

  describe('buildDataState is called with a questionSection containing form blocks', () => {
    beforeEach(() => {
      questionSectionState = buildDataState(qs2);
    });

    it('Then the returned array length should be 6', () => {
      expect(questionSectionState.length).toBe(6);
    });

    it('Then the returned array should contain the value of the text input', () => {
      expect(questionSectionState[0]).toEqual({
        id : 'qb-start-id_input-id',
        value : 'Booja text input'
      });
    });

    it('Then the returned array should contain the value of the textarea', () => {
      expect(questionSectionState[1]).toEqual({
        id : 'qb-start-id_textarea-id',
        value : 'Booja textarea'
      });
    });

    it('Then the returned array should contain checkboxes with selected === true', () => {
      expect(questionSectionState[2]).toEqual({
        id : 'qb-start-id_checkbox-id',
        value : 'society'
      });
      expect(questionSectionState[3]).toEqual({
        id : 'qb-start-id_checkbox-id',
        value : 'Cheque'
      });
    });

    it('And the returned array should contain radio with selected === true', () => {
      expect(questionSectionState[4]).toEqual({
        id : 'qb-start-id_radio-id',
        value : 'Cheque2'
      });
    });

    it('And the returned array should contain date with valid integer value 20001230', () => {
      expect(questionSectionState[5]).toEqual({
        id : 'qb-start-id_date-id',
        value : 20001230
      });
    });
  });

  describe('buildFormBlockState is called with id and value', () => {
    beforeEach(() => {
      formBlockState = buildFormBlockState('id-booja', 'Booja');
    });

    it('Then the returned formBlockState should match expected format', () => {
      expect(formBlockState).toEqual({
        id : 'id-booja',
        value : 'Booja'
      });
    });
  });
});