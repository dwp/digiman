import { Digiman } from '../../app/components/digiman.component';
import { DateBlock } from '../../app/subcomponents/date-block.component';

describe('Digiman', () => {
  let digimanComponent, element;
  const modelJSON = {
    "id": "verify_bank",
    "version": "1.0",
    "questionBlocks" : [
      {
        "id" : "qb-start-id",
        "title": "Title",
        "hasIntroductionHeading": true,
        "readOnly": false,
        "digimanId": "verify_bank-1.0-edit",
        "contents" : [
          {
            "type": "HEADING",
            "content": "Heading of text.",
            "hasIntroductionHeading": true,
            "isSectionWithIntroductionHeading": true
          },
          {
            "type": "TEXT_INPUT",
            "id": "text-input-test",
            "label": "Input box label",
            "hint": "Input box hint",
            "readOnly": false
          },
          {
            "type": "TEXTAREA",
            "id": "textarea-test",
            "label": "Textarea label",
            "hint": "Textarea hint",
            "readOnly": false
          },
          {
            "type": "DATE",
            "id": "date-input-test",
            "label": "Date label",
            "hint": "",
            "readOnly": false
          },
          {
            "type": "CHECKBOX",
            "id": "checkbox-input-test",
            "label": "Checkbox label",
            "hint": "Checkbox hint",
            "readOnly": false,
            "options": [
             {
              "value": "checkbox-input-test-1_0",
              "text": "Option 1"
             },
             {
              "value": "checkbox-input-test-2_1",
              "text": "Option 2"
             }
            ]
          },
          {
            "type": "RADIO",
            "id": "radio-input-test",
            "label": "Radio label",
            "hint": "Radio hint",
            "readOnly": false,
            "options": [
              {
              "value": "radio-input-test-1_0",
              "text": "Option 1"
              },
              {
              "value": "radio-input-test-2_1",
              "text": "Option 2"
              }
            ]
          },
          {
            "type": "HINT",
            "content": "Paragraph of page level hint."
          },
          {
            "type": "PARAGRAPH",
            "content": "Paragraph of text."
          },
          {
            "type": "HEADING",
            "content": "Heading of text.",
            "hasIntroductionHeading": true,
            "isSectionWithIntroductionHeading": false
          },
          {
            "type": "IMPORTANT",
            "content": "Important information paragraph."
          }
        ],
        "question" : {
          "id": "qb-start-id_decision",
          "type" : "RADIO",
          "label" : "Where would you like to go?",
          "readOnly": false,
          "options" : [
            { "questionBlockId": "qb-question-id", "text": "Next question", "optionId": "next-id" },
            { "questionBlockId": "qb-end-yes", "text": "End", "optionId": "end-id" }
          ]
        }
      },
      {
        "id" : "qb-question-id",
        "readOnly": false,
        "hasIntroductionHeading": true,
        "digimanId": "verify_bank-1.0-edit",
        "contents" : [
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
            "id" : "qb-question-id_input-id",
            "type": "TEXT_INPUT",
            "label": "Input Label",
            "help": "Input hint text",
            "readOnly": false
          },
          {
            "id" : "qb-question-id_date-id",
            "type": "DATE",
            "label": "Date Label",
            "hint": null,
            "readOnly": false
          },
          {
            "id" : "qb-question-id_textarea-id",
            "type": "TEXTAREA",
            "label": "Textarea Label",
            "readOnly": false
          },
          {
            "id" : "qb-question-id_checkbox-id",
            "label": "Select any option",
            "type": "CHECKBOX",
            "readOnly": false,
            "options": [
              { "text": "ATM statement (cash point)", "value": "ATM"},
              { "text": "Bank card", "value": "card" },
              { "text": "Building society pass book", "value": "society"},
              { "text": "Cheque book", "value": "Cheque"},
              { "text": "Credit Union statement", "value": "CreditUnion"},
              { "text": "Other recent financial statements", "value": "Other" },
              { "text": "Official letter confirming account has recently been opened in the claimant's name", "value": "letter" },
              { "text": "Recent bank account statement", "value": "Recent" }
            ]
          }
        ],
        "question" : {
          "id": "qb-question-id_decision",
          "type" : "RADIO",
          "label" : "Action question block?",
          "readOnly": false,
          "digimanId": "verify_bank-1.0-edit",
          "options" : [
            { "questionBlockId": "qb-end-yes", "text": "Yes"},
            { "questionBlockId": "qb-end-no", "text": "No"}
          ]
        }
      },
      {
        "id" : "qb-end-yes",
        "readOnly": false,
        "hasIntroductionHeading": true,
        "digimanId": "verify_bank-1.0-edit",
        "contents" : [],
        "question" : {
          "id": "qb-end-yes-action-question-id_decision",
          "type": "CHECKBOX",
          "label": "Confirm the action has been completed",
          "readOnly": false,
          "options" : [
            {
              "questionBlockId": "done", "text": "Done"
            }
          ]
        }
      },
      {
        "id" : "qb-end-no",
        "readOnly": false,
        "hasIntroductionHeading": true,
        "digimanId": "verify_bank-1.0-edit",
        "contents" : [
          {
            "type": "PARAGRAPH",
            "content": "Actions:"
          },
          {
            "type": "LIST",
            "content": [
              "You chosen short path",
              "Complete the to-do"
            ]
          }
        ],
        "question" : {
          "id": "qb-end-no--action-question-id_decision",
          "type": "CHECKBOX",
          "label": "Confirm the action has been completed",
          "readOnly": false,
          "options" : [
            { "questionBlockId": "done", "text": "Done"}
          ]
        }
      }
    ]
  };
  const stateJSON = {
    "definitionType": "verify_bank",
    "definitionVersion": "1.0",
    "agentTodoId": "1234-1234-1234",
    "questionBlockData" : [
      {
        "questionBlockId" : "qb-start-id",
        "answerId" : "qb-question-id",
        "optionId": "next-id"
      },
      {
        "questionBlockId" : "qb-question-id",
        "answerId" : "qb-end-yes",
        "data" : [
          { "id" : "qb-question-id_checkbox-id", "value" : "CreditUnion" },
          { "id" : "qb-question-id_checkbox-id", "value" : "ATM" },
          { "id" : "qb-question-id_input-id", "value": "âêîôûŵŷ!@£$%^&*()_+=-p[]\\';l,./`~¡€#¢∞§¶•ªº–≠≤≥÷¬˚…æ«øπ“‘Ω≈ç√∫~µ≤≥…¬˚∆˙©ƒ∂ßåŒ„‰ÂÊÁËÈØ∏“œ∑´®†¥¨^ø¬˚∆˙©ƒ∂ß\"\" ::\" \":';][p <script>alert('input');</script>" },
          { "id" : "qb-question-id_textarea-id", "value": "âêîôûŵŷ!@£$%^&*()_+=-p[]\\';l,./`~¡€#¢∞§¶•ªº–≠≤≥÷¬˚…æ«øπ“‘Ω≈ç√∫~µ≤≥…¬˚∆˙©ƒ∂ßåŒ„‰ÂÊÁËÈØ∏“œ∑´®†¥¨^ø¬˚∆˙©ƒ∂ß\"\" ::\" \":';][p <script>alert('textarea');</script>" },
          { "id" : "qb-question-id_date-id", "value": 20001230 }
        ]
      }
    ]
  };
  const emptyStateJSON = {
    "definitionType": "verify_bank",
    "definitionVersion": "1.0",
    "agentTodoId": "1234-1234-1234",
    "questionBlockData" : []
  };

  const body = document.querySelector('body');

  const fixture = `<div>
                     <script type="text/x-template" class="spinner__template">
                       <div class="spinner">
                         <span class="spinner__icon " aria-hidden="true">
                          <span class="spinner__petal"></span>
                          <span class="spinner__petal"></span>
                          <span class="spinner__petal"></span>
                          <span class="spinner__petal"></span>
                          <span class="spinner__petal"></span>
                          <span class="spinner__petal"></span>
                          <span class="spinner__petal"></span>
                          <span class="spinner__petal"></span>
                          <span class="spinner__petal"></span>
                          <span class="spinner__petal"></span>
                          <span class="spinner__petal"></span>
                          <span class="spinner__petal"></span>
                         </span>
                         <p class="spinner__text">Loading</p>
                       </div>
                      </script>
                      <input type="hidden" name="csrfToken" value="1234"/>
                    </div>`;

  const editFixture = `<div class="panel digiman" id="digiman-test" data-read-only="false" data-state-endpoint="test-endpoint.com" data-general-error="Error">
    ${fixture}
  </div>`;
  const editWithAutosaveFixture = `<div class="panel digiman" id="digiman-test-autosave" data-auto-save-on-completion="true" data-read-only="false" data-state-endpoint="test-endpoint.com" data-general-error="Error">
    ${fixture}
  </div>`;
  const readFixture = `<div class="panel digiman" id="digiman-test-read" data-read-only="true" data-state-endpoint="test-endpoint.com" data-general-error="Error">
    ${fixture}
  </div>`;
  const loadOnClickFixture = `<div class="panel digiman" id="digiman-load"
                                   data-read-only="true"
                                   data-load-on-click="true"
                                   data-state-endpoint="test-endpoint.com"
                                   data-general-error="Error">
                                ${fixture}
                              </div>`;

  afterEach(() => {
    digimanComponent = null;
    element.remove();
    element = null;
  });

  describe('When Digiman Component is initialised', () => {

    beforeEach(() => {
      body.insertAdjacentHTML('beforeend', editFixture);
      element = document.getElementById('digiman-test');
      digimanComponent = new Digiman(element);
    });

    it('Then DEFINITION_ENDPOINT is defined', () => {
      expect(digimanComponent.DEFINITION_ENDPOINT).toBe(undefined);
    });

    it('And STATE_ENDPOINT is defined', () => {
      expect(digimanComponent.STATE_ENDPOINT).toBe('test-endpoint.com');
    });

    it('And GENERAL_ERROR is defined', () => {
      expect(digimanComponent.GENERAL_ERROR).toBe('Error');
    });

    it('And IS_READ_ONLY is defined', () => {
      expect(digimanComponent.IS_READ_ONLY).toBe(false);
    });

    it('And csrfToken is defined', () => {
      expect(digimanComponent.csrfToken.value).toBe('1234');
    });

    it('And questionSections is defined', () => {
      expect(digimanComponent.questionSections).toEqual([]);
    });

    it('And state is defined', () => {
      expect(digimanComponent.state).toEqual([]);
    });

    it('And postCompletionQuery to be empty string', () => {
      expect(digimanComponent.postCompletionQuery).toEqual('');
    });

    describe('When Digiman model is loaded', () => {
      beforeEach(() => {
        let modelJsonTemplate = JSON.parse(JSON.stringify(modelJSON));
        let stateJsonTemplate = JSON.parse(JSON.stringify(emptyStateJSON));

        spyOn(digimanComponent, 'buildQuestionSections').and.callThrough();
        spyOn(digimanComponent, 'renderQuestionSections').and.callThrough();
        spyOn(digimanComponent, 'fetchModel').and.callFake(() => {
          digimanComponent.handleModelSuccessResponse(modelJsonTemplate);
        });

        digimanComponent.handleStateSuccessResponse(stateJsonTemplate);
      });

      it('Then buildQuestionSections is called', () => {
        expect(digimanComponent.buildQuestionSections).toHaveBeenCalledWith(modelJSON['questionBlocks']);
      });

      it('And renderQuestionSections is called', () => {
        expect(digimanComponent.renderQuestionSections).toHaveBeenCalledTimes(1);
      });

      it('And questionSections array is created', () => {
        expect(digimanComponent.questionSections.length).toBe(4);
      });

      it('And questionSections are editable', () => {
        expect(digimanComponent.questionSections[0].readOnly).toBe(false);
      });

      describe('When createUniqueId is called', () => {
        it('Then verify_bank-1.0-edit is returned', () => {
          expect(digimanComponent.createUniqueId()).toBe('verify_bank-1.0-edit');
        });
      });

      describe('When Digiman state is loaded with empty state', () => {
        it('Then fetchModel is called', () => {
          expect(digimanComponent.fetchModel).toHaveBeenCalled();
        });

        it('And qb-start-id section is rendered on the page', () => {
          expect(document.getElementById('verify_bank-1.0-edit__qb-start-id')).not.toBe(null);
        });

        it('And qb-question-id section is not rendered on the page', () => {
          expect(document.getElementById('verify_bank-1.0-edit__qb-question-id')).toBe(null);
        });
      });
    });

    describe('When Digiman model and state is loaded', () => {
      beforeEach(() => {
        let modelJsonTemplate = JSON.parse(JSON.stringify(modelJSON));
        let stateJsonTemplate = JSON.parse(JSON.stringify(stateJSON));

        spyOn(digimanComponent, 'buildQuestionSections').and.callThrough();
        spyOn(digimanComponent, 'renderQuestionSections').and.callThrough();
        spyOn(digimanComponent, 'fetchModel').and.callFake(() => {
          digimanComponent.handleModelSuccessResponse(modelJsonTemplate);
        });

        digimanComponent.handleStateSuccessResponse(stateJsonTemplate);
      });

      describe('When Digiman state is loaded with partially completed state', () => {

        it('Then fetchModel is called', () => {
          expect(digimanComponent.fetchModel).toHaveBeenCalled();
        });

        it('And json_meta is defined', () => {
          expect(digimanComponent.json_meta).toEqual({ definitionType: 'verify_bank', definitionVersion: '1.0', agentTodoId: '1234-1234-1234' });
        });

        it('And qb-start-id section is rendered on the page', () => {
          expect(document.getElementById('verify_bank-1.0-edit__qb-start-id')).not.toBe(null);
        });

        it('And qb-start-id decision block radio is selected', () => {
          expect(document.getElementById('qb-start-id_decision-qb-question-id-next-id').checked).toBe(true);
        });

        it('And qb-question-id section is rendered on the page', () => {
          expect(document.getElementById('verify_bank-1.0-edit__qb-question-id')).not.toEqual(null);
        });

        it('And qb-question-id decision block radio is selected', () => {
          expect(document.getElementById('qb-question-id_decision-qb-end-yes').checked).toBe(true);
        });

        it('And qb-question-id content form block CreditUnion checkbox is selected', () => {
          expect(document.getElementById('qb-question-id_checkbox-id-CreditUnion').checked).toBe(true);
        });

        it('And qb-question-id content form block ATM checkbox is selected', () => {
          expect(document.getElementById('qb-question-id_checkbox-id-ATM').checked).toBe(true);
        });

        it('And qb-question-id content form block text input value is specified', () => {
          expect(document.getElementById('qb-question-id_input-id').value).toBe('âêîôûŵŷ!@£$%^&*()_+=-p[]\\\';l,./`~¡€#¢∞§¶•ªº–≠≤≥÷¬˚…æ«øπ“‘Ω≈ç√∫~µ≤≥…¬˚∆˙©ƒ∂ßåŒ„‰ÂÊÁËÈØ∏“œ∑´®†¥¨^ø¬˚∆˙©ƒ∂ß"" ::" ":\';][p <script>alert(\'input\');</script>');
        });

        it('And qb-question-id content form block textarea value is specified', () => {
          expect(document.getElementById('qb-question-id_textarea-id').value).toBe('âêîôûŵŷ!@£$%^&*()_+=-p[]\\\';l,./`~¡€#¢∞§¶•ªº–≠≤≥÷¬˚…æ«øπ“‘Ω≈ç√∫~µ≤≥…¬˚∆˙©ƒ∂ßåŒ„‰ÂÊÁËÈØ∏“œ∑´®†¥¨^ø¬˚∆˙©ƒ∂ß"" ::" ":\';][p <script>alert(\'textarea\');</script>');
        });

        it('And qb-question-id content form block date-day value is specified', () => {
          expect(document.getElementById('qb-question-id_date-id.day').value).toBe('30');
        });

        it('And qb-question-id content form block date-month value is specified', () => {
          expect(document.getElementById('qb-question-id_date-id.month').value).toBe('12');
        });

        it('And qb-question-id content form block date-year value is specified', () => {
          expect(document.getElementById('qb-question-id_date-id.year').value).toBe('2000');
        });

        it('And qb-end-yes section is rendered on the page', () => {
          expect(document.getElementById('verify_bank-1.0-edit__qb-end-yes')).not.toBe(null);
        });

        it('And qb-end-no section is not rendered on the page', () => {
          expect(document.getElementById('verify_bank-1.0-edit__qb-end-no')).toBe(null);
        });
      });

      describe('When updateFormBlockState is called', () => {
        let inputBlock, dateBlock;
        beforeEach(() => {
          inputBlock = digimanComponent.questionSections[1].getContentBlockById('qb-question-id_input-id');
          dateBlock = digimanComponent.questionSections[1].getContentBlockById('qb-question-id_date-id');

          digimanComponent.updateFormBlockState(inputBlock, 'TestValue');
          digimanComponent.updateFormBlockState(dateBlock, 20001001);
        });

        it('Then value is updated to TestValue', () => {
          expect(digimanComponent.questionSections[1].getContentBlockById('qb-question-id_input-id').value).toBe('TestValue');
        });

        it('And value of date component is updated to 20001001', () => {
          expect(digimanComponent.questionSections[1].getContentBlockById('qb-question-id_date-id').value).toBe(20001001);
        });
      });

      describe('When updateFormBlockState for DATE block is called', () => {
        let dateBlock;
        beforeEach(() => {
          dateBlock = new DateBlock({id: 'qb-question-id_date-id', type: 'DATE', label: 'Date Label', hint: null, readOnly: false});

          digimanComponent.updateFormBlockState(dateBlock, '01', 'day');
          digimanComponent.updateFormBlockState(dateBlock, '12', 'month');
          digimanComponent.updateFormBlockState(dateBlock, '1999', 'year');
        });

        afterEach(() => {
          dateBlock = null;
        });

        it('Then day attribute is updated for dateBlock', () => {
          expect(dateBlock.day).toBe('01');
        });

        it('Then month attribute is updated for dateBlock', () => {
          expect(dateBlock.month).toBe('12');
        });

        it('Then year attribute is updated for dateBlock', () => {
          expect(dateBlock.year).toBe('1999');
        });

        it('Then value of date component is updated to 19991201', () => {
          expect(dateBlock.value).toBe(19991201);
        });
      });

      describe('When setNextState is called with checked target', () => {
        beforeEach(() => {

          const questionSectionNode = document.getElementById('verify_bank-1.0-edit__qb-start-id');
          const nextSectionId = 'qb-question-id';
          const optioinId = 'next-id';

          digimanComponent.setNextState(questionSectionNode, nextSectionId, true, optioinId);
        });

        it('Then qb-start-id decision block nextSection is set to qb-question-id', () => {
          expect(digimanComponent.getQuestionSectionById('qb-start-id').decisionBlock.nextSection).toBe('qb-question-id');
        });

        it('And object html is updated with correct next state', () => {
          expect(digimanComponent.getQuestionSectionById('qb-start-id').htmlNode.dataset.nextState).toBe('qb-question-id');
        });

        it('And html is updated', () => {
          expect(document.getElementById('verify_bank-1.0-edit__qb-start-id').dataset.nextState).toBe('qb-question-id');
        });

        it('And qb-question-id section is rendered on the page', () => {
          expect(document.getElementById('verify_bank-1.0-edit__qb-question-id')).not.toBe(null);
        });
      });

      describe('When setNextState is called with unchecked target', () => {
        beforeEach(() => {

          const questionSectionNode = document.getElementById('verify_bank-1.0-edit__qb-start-id');
          const nextSectionId = 'qb-question-id';
          const optionId = 'next-id';

          spyOn(digimanComponent, 'renderSection');

          digimanComponent.setNextState(questionSectionNode, nextSectionId, false, optionId);
        });

        it('Then renderSection is not called', () => {
          expect(digimanComponent.renderSection).not.toHaveBeenCalled();
        });

        it('And html is updated', () => {
          expect(document.getElementById('verify_bank-1.0-edit__qb-start-id').dataset.nextState).toBe('');
        });
      });

      describe('When getQuestionSectionById is called', () => {
        it('Then the expected question section is returned', () => {
          expect(digimanComponent.getQuestionSectionById('qb-question-id').id).toBe('qb-question-id');
        });
      });

      describe('When updateFormChoices is called', () => {
        beforeEach(() => {
          let qs = digimanComponent.getQuestionSectionById('qb-question-id');
          digimanComponent.updateFormChoices(qs, [
                                                { "id" : "qb-question-id_checkbox-id", "value" : "Other" },
                                                { "id" : "qb-question-id_input-id", "value": "Input value after update" },
                                                { "id" : "qb-question-id_textarea-id", "value": "Textarea value after update" }
                                              ]);
        });

        it('Then Other checkbox is selected', () => {
          expect(digimanComponent.getQuestionSectionById('qb-question-id').getContentBlockById('qb-question-id_checkbox-id').options[5].selected).toBe(true);
        });

        it('And text input value is "Input value after update"', () => {
          expect(digimanComponent.getQuestionSectionById('qb-question-id').getContentBlockById('qb-question-id_input-id').value).toBe('Input value after update');
        });

        it('And textarea value is "Textarea value after update"', () => {
          expect(digimanComponent.getQuestionSectionById('qb-question-id').getContentBlockById('qb-question-id_textarea-id').value).toBe('Textarea value after update');
        });
      });

      describe('When resetStateTree is called', () => {
        beforeEach(() => {
          spyOn(digimanComponent, 'removeSection');
          digimanComponent.resetStateTree('qb-start-id');
        });

        it('Then removeSection should be called 2 times', () => {
          expect(digimanComponent.removeSection).toHaveBeenCalledTimes(2);
        });

        it('And removeSection is called with correct question section in the first call', () => {
          expect(digimanComponent.removeSection.calls.allArgs()[0][0].id).toBe('verify_bank-1.0-edit__qb-question-id');
        });

        it('And removeSection is called with correct question section in the second call', () => {
          expect(digimanComponent.removeSection.calls.allArgs()[1][0].id).toBe('verify_bank-1.0-edit__qb-end-yes');
        });

        it('And CreditUnion checkbox is reset to selected false', () => {
          expect(digimanComponent.getQuestionSectionById('qb-question-id').getContentBlockById('qb-question-id_checkbox-id').options[4].selected).toBe(false);
        });

        it('And ATM checkbox is reset to selected false', () => {
          expect(digimanComponent.getQuestionSectionById('qb-question-id').getContentBlockById('qb-question-id_checkbox-id').options[0].selected).toBe(false);
        });

        it('And text input value is reset to empty string', () => {
          expect(digimanComponent.getQuestionSectionById('qb-question-id').getContentBlockById('qb-question-id_input-id').value).toBe('');
        });

        it('And textarea value is reset to empty string', () => {
          expect(digimanComponent.getQuestionSectionById('qb-question-id').getContentBlockById('qb-question-id_textarea-id').value).toBe('');
        });

      });

      describe('When handleClick is called by decision block', () => {
        beforeEach(() => {
          const node = document.getElementById('qb-start-id_decision-qb-end-yes-end-id');
          const event = {
            target: node
          };

          spyOn(digimanComponent, 'handleDecisionBlockClick');

          digimanComponent.handleClick(event);
        });

        it('Then handleDecisionBlockClick is called once', () => {
          expect(digimanComponent.handleDecisionBlockClick).toHaveBeenCalledTimes(1);
        });
      });

      describe('When handleNumericInput is called', () => {
        let node;

        beforeEach(() => {
          node = document.getElementById('qb-question-id_date-id.day');
          node.value = 'e1';
          const event = {
            target: node
          };

          digimanComponent.handleNumericInput(event);
        });

        it('Then any non-numeric characters are removed from value', () => {
          expect(node.value).toBe('1');
        });
      });

      describe('When handleDatePickerClick is called', () => {
        let dateBlock;

        beforeEach(() => {
          const node = document.getElementById('qb-question-id_date-id.day');
          const event = {
            target: node
          };

          const qs = digimanComponent.getQuestionSectionById('qb-question-id');
          dateBlock = qs.getContentBlockById('qb-question-id_date-id');

          document.getElementById('qb-question-id_date-id.day').value = 10;
          document.getElementById('qb-question-id_date-id.month').value = 12;
          document.getElementById('qb-question-id_date-id.year').value = 1999;

          digimanComponent.handleDatePickerClick(event);
        });

        it('Then day is set to 10', () => {
          expect(dateBlock.day).toBe('10');
        });

        it('And month is set to 12', () => {
          expect(dateBlock.month).toBe('12');
        });

        it('And day is set to 1999', () => {
          expect(dateBlock.year).toBe('1999');
        });
      });

      describe('When handleClick is called by already chosen decision block', () => {
        beforeEach(() => {
          const node = document.getElementById('qb-start-id_decision-qb-end-yes-end-id');
          const event = {
            target: node
          };

          spyOn(digimanComponent, 'handleDecisionBlockClick');

          document.getElementById('verify_bank-1.0-edit__qb-start-id').dataset.nextState = 'qb-end-yes';
          document.getElementById('verify_bank-1.0-edit__qb-start-id').dataset.selectedOptionId = 'end-id';

          digimanComponent.handleClick(event);
        });

        it('Then handleDecisionBlockClick is not called', () => {
          expect(digimanComponent.handleDecisionBlockClick).toHaveBeenCalledTimes(0);
        });
      });

      describe('When handleClick is called by non-decision block', () => {
        beforeEach(() => {
          const node = document.getElementById('qb-question-id_checkbox-id-ATM');
          const event = {
            target: node
          };

          spyOn(digimanComponent, 'updateFormBlockState');

          digimanComponent.handleClick(event);
        });

        it('Then updateFormBlockState is called', () => {
          expect(digimanComponent.updateFormBlockState).toHaveBeenCalled();
        });
      });

      describe('When a new state is set for Option Block', () => {
        let optionBlock;
        beforeEach(() => {
          optionBlock = digimanComponent.getQuestionSectionById('qb-question-id').getContentBlockById('qb-question-id_checkbox-id');
          optionBlock.setState('letter', true);
        });

        it('Then qb-question-id_checkbox-id CHECKBOX is selected', () => {
          expect(optionBlock.options).toEqual([{"text":"ATM statement (cash point)","value":"ATM","selected":true},{"text":"Bank card","value":"card"},{"text":"Building society pass book","value":"society"},{"text":"Cheque book","value":"Cheque"},{"text":"Credit Union statement","value":"CreditUnion","selected":true},{"text":"Other recent financial statements","value":"Other"},{"text":"Official letter confirming account has recently been opened in the claimant's name","value":"letter","selected":true},{"text":"Recent bank account statement","value":"Recent"}]);
        });

        describe('When another state is set for Option Block', () => {
          beforeEach(() => {
            optionBlock.setState('letter', true);
            optionBlock.setState('letter', false);
          });

          it('And the qb-question-id_checkbox-id CHECKBOX is unselected', () => {
            expect(optionBlock.options).toEqual([{"text":"ATM statement (cash point)","value":"ATM","selected":true},{"text":"Bank card","value":"card"},{"text":"Building society pass book","value":"society"},{"text":"Cheque book","value":"Cheque"},{"text":"Credit Union statement","value":"CreditUnion","selected":true},{"text":"Other recent financial statements","value":"Other"},{"text":"Official letter confirming account has recently been opened in the claimant's name","value":"letter","selected":false},{"text":"Recent bank account statement","value":"Recent"}]);
          });
        });
      });

      describe('When handleDecisionBlockClick is called', () => {
        beforeEach(() => {
          const node = document.getElementById('verify_bank-1.0-edit__qb-start-id');
          const options = {
            newNextStateId: 'newStateId',
            oldNextStateId: 'oldStateId',
            qsNode: node,
            isChecked: true,
            optionId: ''
          };

          spyOn(digimanComponent, 'resetStateTree');
          spyOn(digimanComponent, 'setNextState');
          spyOn(digimanComponent, 'debouncedSendState');

          digimanComponent.handleDecisionBlockClick(options);
        });

        it('Then resetStateTree is called', () => {
          expect(digimanComponent.resetStateTree).toHaveBeenCalled();
        });

        it('And setNextState is called', () => {
          expect(digimanComponent.setNextState).toHaveBeenCalled();
        });

        it('And debouncedSendState is called', () => {
          expect(digimanComponent.debouncedSendState).toHaveBeenCalled();
        });

        it('And state is updated', () => {
          expect(digimanComponent.state).toEqual(
            [
              { questionBlockId: 'qb-start-id', answerId: 'qb-question-id', optionId: 'next-id' },
              { questionBlockId: 'qb-question-id', answerId: 'qb-end-yes', data:
                [
                  { id: 'qb-question-id_input-id', value: 'âêîôûŵŷ!@£$%^&*()_+=-p[]\\\';l,./`~¡€#¢∞§¶•ªº–≠≤≥÷¬˚…æ«øπ“‘Ω≈ç√∫~µ≤≥…¬˚∆˙©ƒ∂ßåŒ„‰ÂÊÁËÈØ∏“œ∑´®†¥¨^ø¬˚∆˙©ƒ∂ß"" ::" ":\';][p <script>alert(\'input\');</script>' },
                  { id: 'qb-question-id_date-id', value: 20001230 },
                  { id: 'qb-question-id_textarea-id', value: 'âêîôûŵŷ!@£$%^&*()_+=-p[]\\\';l,./`~¡€#¢∞§¶•ªº–≠≤≥÷¬˚…æ«øπ“‘Ω≈ç√∫~µ≤≥…¬˚∆˙©ƒ∂ßåŒ„‰ÂÊÁËÈØ∏“œ∑´®†¥¨^ø¬˚∆˙©ƒ∂ß"" ::" ":\';][p <script>alert(\'textarea\');</script>' },
                  { id: 'qb-question-id_checkbox-id', value: 'ATM' },
                  { id: 'qb-question-id_checkbox-id', value: 'CreditUnion' }
                ]
              }
            ]
          );
        });
      });

      describe('When handleDecisionBlockClick is called with empty old state', () => {
        beforeEach(() => {
          const options = {
            newNextStateId: 'newStateId',
            oldNextStateId: '',
            qsNode: {},
            isChecked: false
          };

          spyOn(digimanComponent, 'resetStateTree');
          spyOn(digimanComponent, 'setNextState');
          spyOn(digimanComponent, 'debouncedSendState');

          digimanComponent.handleDecisionBlockClick(options);
        });

        it('Then resetStateTree is not called', () => {
          expect(digimanComponent.resetStateTree).not.toHaveBeenCalled();
        });

        it('And setNextState is called', () => {
          expect(digimanComponent.setNextState).toHaveBeenCalled();
        });

        it('And debouncedSendState is called', () => {
          expect(digimanComponent.debouncedSendState).toHaveBeenCalled();
        });
      });

      describe('When Digiman first decision block is selected', () => {
        beforeEach(() => {
          let node = document.getElementById('qb-start-id_decision-qb-end-yes-end-id');
          node.checked = true;
  
          const event = {
            target: node
          };
          digimanComponent.handleClick(event); 
        });
  
        describe('When content blocks are modified', () => {
  
          beforeEach(() => {
            //Text input
            let inputBox = element.querySelector('#text-input-test');
            inputBox.value = 'changing state text input';
  
            const inputEvent = {
              target: inputBox
            };
            
            digimanComponent.handleBlur(inputEvent);
  
            //Textarea
            let textArea = element.querySelector('#textarea-test');
            textArea.value = 'changing state textarea';
  
            const textAreaEvent = {
              target: textArea
            };
            
            digimanComponent.handleBlur(textAreaEvent);
  
            //Date inputs
            let dateDay = element.querySelector('#id-section-date-input-test .day');
            let dateMonth = element.querySelector('#id-section-date-input-test .month');
            let dateYear = element.querySelector('#id-section-date-input-test .year');
            dateDay.value = '10';
            dateMonth.value = '10';
            dateYear.value = '2010';
  
            const dateEvent = {
              target: dateYear
            };
            
            digimanComponent.handleBlur(dateEvent);
  
            //Radio options
            let radioOption = element.querySelector('#radio-input-test-radio-input-test-1_0');
            radioOption.checked = true;
  
            const radioEvent = {
              target: radioOption
            };
            
            digimanComponent.handleClick(radioEvent);
  
            //Checkbox options
            let checkboxOption = element.querySelector('#checkbox-input-test-checkbox-input-test-1_0');
            checkboxOption.checked = true;
  
            const checkboxEvent = {
              target: checkboxOption
            };
            
            digimanComponent.handleClick(checkboxEvent);
          });
  
          it('Then state is not updated', () => {
            expect(digimanComponent.state[0].data).toEqual(undefined);
          });
        });
  
        describe('When Digiman state is loaded with partially completed state', () => {
          it('Then postCompletionQuery is an empty string', () => {
            expect(digimanComponent.postCompletionQuery).toEqual('');
          });
        });
  
        describe('When DONE checkbox is clicked', () => {
          beforeEach(() => {
            let endNode = document.getElementById('qb-end-yes-action-question-id_decision-done');
            endNode.checked = true;
  
            const event = {
              target: endNode
            };
            digimanComponent.handleClick(event);
          });
  
          it('Then postCompletionQuery is set to empty string', () => {
            expect(digimanComponent.postCompletionQuery).toEqual('');
          });
  
          describe('When a content blocks are modified', () => {
  
            beforeEach(() => {
              //Text input
              let inputBox = element.querySelector('#text-input-test');
              inputBox.value = 'changing state text input 2';
    
              const inputEvent = {
                target: inputBox
              };
              
              digimanComponent.handleBlur(inputEvent);
    
              //Textarea
              let textArea = element.querySelector('#textarea-test');
              textArea.value = 'changing state textarea 2';
    
              const textAreaEvent = {
                target: textArea
              };
              
              digimanComponent.handleBlur(textAreaEvent);
    
              //Date inputs
              let dateDay = element.querySelector('#id-section-date-input-test .day');
              let dateMonth = element.querySelector('#id-section-date-input-test .month');
              let dateYear = element.querySelector('#id-section-date-input-test .year');
              dateDay.value = '11';
              dateMonth.value = '11';
              dateYear.value = '2011';
    
              const dateEvent = {
                target: dateYear
              };
              
              digimanComponent.handleBlur(dateEvent);
    
              //Radio options
              let radioOption = element.querySelector('#radio-input-test-radio-input-test-2_1');
              radioOption.checked = true;
    
              const radioEvent = {
                target: radioOption
              };
              
              digimanComponent.handleClick(radioEvent);
    
              //Checkbox options
              let checkboxOption = element.querySelector('#checkbox-input-test-checkbox-input-test-2_1');
              checkboxOption.checked = true;
    
              const checkboxEvent = {
                target: checkboxOption
              };
              
              digimanComponent.handleClick(checkboxEvent);
            });
  
            it('Then state is updated', () => {
              expect(digimanComponent.state[0].data).toEqual(undefined);
            });
          });
        });
      });
    });
  });

  describe('When Digiman Component is initialised with READ ONLY access', () => {
    beforeEach(() => {
      body.insertAdjacentHTML('beforeend', readFixture);
      element = document.getElementById('digiman-test-read');
      digimanComponent = new Digiman(element);
    });

    it('Then IS_READ_ONLY is defined', () => {
      expect(digimanComponent.IS_READ_ONLY).toBe(true);
    });

    describe('When Digiman model is initialised', () => {
      beforeEach(() => {
        spyOn(digimanComponent, 'fetchState');
        spyOn(digimanComponent, 'bindEvents');

        digimanComponent.init();
      });

      it('Then fetchState is called', () => {
        expect(digimanComponent.fetchState).toHaveBeenCalled();
      });

      it('And bindEvents is not called', () => {
        expect(digimanComponent.bindEvents).not.toHaveBeenCalled();
      });
    });

    describe('When Digiman model is loaded', () => {
      beforeEach(() => {
        let modelJsonTemplate = JSON.parse(JSON.stringify(modelJSON));

        spyOn(digimanComponent, 'buildQuestionSections').and.callThrough();
        spyOn(digimanComponent, 'renderQuestionSections').and.callThrough();

        digimanComponent.handleModelSuccessResponse(modelJsonTemplate);
      });

      it('Then questionSections are read only', () => {
        expect(digimanComponent.questionSections[0].readOnly).toBe(true);
      });

      describe('When createUniqueId is called', () => {
        beforeEach(() => {
          let modelJsonTemplate = JSON.parse(JSON.stringify(modelJSON));
          let stateJsonTemplate = JSON.parse(JSON.stringify(emptyStateJSON));

          spyOn(digimanComponent, 'fetchModel').and.callFake(() => {
            digimanComponent.handleModelSuccessResponse(modelJsonTemplate);
          });

          digimanComponent.handleStateSuccessResponse(stateJsonTemplate);
        });
        it('Then verify_bank-1.0-read is returned', () => {
          expect(digimanComponent.createUniqueId()).toBe('verify_bank-1.0-read');
        });
      });
    });
  });

  describe('When Digiman Component is initialised with LOAD ON CLICK', () => {
    beforeEach(() => {
      body.insertAdjacentHTML('beforeend', loadOnClickFixture);
      body.insertAdjacentHTML('beforeend', `<div id="digiman-loader"><button class="expand-help__button">Load Digiman</button></div>`);
      element = document.getElementById('digiman-load');

      digimanComponent = new Digiman(element);
    });

    afterEach(() => {
      document.getElementById('digiman-loader').remove();
    });

    it('Then IS_LOAD_ON_CLICK is defined', () => {
      expect(digimanComponent.IS_LOAD_ON_CLICK).toBe(true);
    });

    describe('When Digiman model is initialised', () => {
      it('Then DEFINITION_ENDPOINT is not defined', () => {
        expect(digimanComponent.DEFINITION_ENDPOINT).toBe(undefined);
      });

      it('And questionSections is empty', () => {
        expect(digimanComponent.questionSections).toEqual([]);
      });

      it('And state is empty', () => {
        expect(digimanComponent.state).toEqual([]);
      });

      it('And json_meta is undefined', () => {
        expect(digimanComponent.json_meta).toBe(undefined);
      });

      it('And QUESTION_BLOCK_DATA is empty', () => {
        expect(digimanComponent.QUESTION_BLOCK_DATA).toEqual([]);
      });
    });

    describe('When load button is pressed', () => {
      beforeEach(() => {
        let modelJsonTemplate = JSON.parse(JSON.stringify(modelJSON));
        let stateJsonTemplate = JSON.parse(JSON.stringify(emptyStateJSON));

        spyOn(digimanComponent, 'fetchModel').and.callFake(() => {
          digimanComponent.handleModelSuccessResponse(modelJsonTemplate);
        });

        spyOn(digimanComponent, 'fetchState').and.callFake(() => {
          digimanComponent.handleStateSuccessResponse(stateJsonTemplate);
        });

        digimanComponent.loadDigiman();
      });

      it('Then DEFINITION_ENDPOINT is defined', () => {
        expect(digimanComponent.DEFINITION_ENDPOINT).toBe('/digiman/definition/verify_bank/1.0');
      });

      it('And fetchState is called', () => {
        expect(digimanComponent.fetchState).toHaveBeenCalledTimes(1);
      });

      it('And fetchModel is called', () => {
        expect(digimanComponent.fetchModel).toHaveBeenCalledTimes(1);
      });

      it('And questionSections is not empty', () => {
        expect(digimanComponent.questionSections).not.toEqual([]);
      });

      it('And json_meta is not empty', () => {
        expect(digimanComponent.json_meta).not.toEqual({});
      });
    });
  });

  describe('When Digiman is loaded with error', () => {
    beforeEach(() => {
      body.insertAdjacentHTML('beforeend', editFixture);
      element = document.getElementById('digiman-test');
      digimanComponent = new Digiman(element);

      digimanComponent.handleError();
    });

    it('Then error message is displayed', () => {
      expect(digimanComponent.errorNode).not.toBe(undefined);
    });

    it('And error message contains refresh link', () => {
      expect(digimanComponent.errorNode.innerHTML.indexOf('digiman__refresh-button') > 0).toBe(true);
    });
  });

  describe('When Digiman Component is initialised with auto save', () => {

    beforeEach(() => {
      body.insertAdjacentHTML('beforeend', editWithAutosaveFixture);
      element = document.getElementById('digiman-test-autosave');
      digimanComponent = new Digiman(element);
    });

    describe('When Digiman model and state is loaded', () => {
      beforeEach(() => {
        let modelJsonTemplate = JSON.parse(JSON.stringify(modelJSON));
        let stateJsonTemplate = JSON.parse(JSON.stringify(stateJSON));

        spyOn(digimanComponent, 'fetchModel').and.callFake(() => {
          digimanComponent.handleModelSuccessResponse(modelJsonTemplate);
        });

        digimanComponent.handleStateSuccessResponse(stateJsonTemplate);

        let node = document.getElementById('qb-start-id_decision-qb-end-yes-end-id');
        node.checked = true;

        const event = {
          target: node
        };
        digimanComponent.handleClick(event); 
      });

      describe('When content blocks are modified', () => {

        beforeEach(() => {
          //Text input
          let inputBox = element.querySelector('#text-input-test');
          inputBox.value = 'changing state text input';

          const inputEvent = {
            target: inputBox
          };
          
          digimanComponent.handleBlur(inputEvent);

          //Textarea
          let textArea = element.querySelector('#textarea-test');
          textArea.value = 'changing state textarea';

          const textAreaEvent = {
            target: textArea
          };
          
          digimanComponent.handleBlur(textAreaEvent);

          //Date inputs
          let dateDay = element.querySelector('#id-section-date-input-test .day');
          let dateMonth = element.querySelector('#id-section-date-input-test .month');
          let dateYear = element.querySelector('#id-section-date-input-test .year');
          dateDay.value = '10';
          dateMonth.value = '10';
          dateYear.value = '2010';

          const dateEvent = {
            target: dateYear
          };
          
          digimanComponent.handleBlur(dateEvent);

          //Radio options
          let radioOption = element.querySelector('#radio-input-test-radio-input-test-1_0');
          radioOption.checked = true;

          const radioEvent = {
            target: radioOption
          };
          
          digimanComponent.handleClick(radioEvent);

          //Checkbox options
          let checkboxOption = element.querySelector('#checkbox-input-test-checkbox-input-test-1_0');
          checkboxOption.checked = true;

          const checkboxEvent = {
            target: checkboxOption
          };
          
          digimanComponent.handleClick(checkboxEvent);
        });

        it('Then state is not updated', () => {
          expect(digimanComponent.state[0].data).toEqual(undefined);
        });
      });

      describe('When Digiman state is loaded with partially completed state', () => {
        it('Then postCompletionQuery is an empty string', () => {
          expect(digimanComponent.postCompletionQuery).toEqual('');
        });
      });

      describe('When DONE checkbox is clicked', () => {
        beforeEach(() => {
          let endNode = document.getElementById('qb-end-yes-action-question-id_decision-done');
          endNode.checked = true;

          const event = {
            target: endNode
          };
          digimanComponent.handleClick(event);
        });

        it('Then postCompletionQuery is set to ?postCompletionState=true', () => {
          expect(digimanComponent.postCompletionQuery).toEqual('?postCompletionState=true');
        });

        describe('When a content blocks are modified', () => {

          beforeEach(() => {
            //Text input
            let inputBox = element.querySelector('#text-input-test');
            inputBox.value = 'changing state text input 2';
  
            const inputEvent = {
              target: inputBox
            };
            
            digimanComponent.handleBlur(inputEvent);
  
            //Textarea
            let textArea = element.querySelector('#textarea-test');
            textArea.value = 'changing state textarea 2';
  
            const textAreaEvent = {
              target: textArea
            };
            
            digimanComponent.handleBlur(textAreaEvent);
  
            //Date inputs
            let dateDay = element.querySelector('#id-section-date-input-test .day');
            let dateMonth = element.querySelector('#id-section-date-input-test .month');
            let dateYear = element.querySelector('#id-section-date-input-test .year');
            dateDay.value = '11';
            dateMonth.value = '11';
            dateYear.value = '2011';
  
            const dateEvent = {
              target: dateYear
            };
            
            digimanComponent.handleBlur(dateEvent);
  
            //Radio options
            let radioOption = element.querySelector('#radio-input-test-radio-input-test-2_1');
            radioOption.checked = true;
  
            const radioEvent = {
              target: radioOption
            };
            
            digimanComponent.handleClick(radioEvent);
  
            //Checkbox options
            let checkboxOption = element.querySelector('#checkbox-input-test-checkbox-input-test-2_1');
            checkboxOption.checked = true;
  
            const checkboxEvent = {
              target: checkboxOption
            };
            
            digimanComponent.handleClick(checkboxEvent);
          });

          it('Then state is updated', () => {
            expect(digimanComponent.state[0].data).toEqual([
              {id: 'text-input-test', value: 'changing state text input 2'}, 
              {id: 'textarea-test', value: 'changing state textarea 2'}, 
              {id: 'checkbox-input-test', value: 'checkbox-input-test-2_1'}, 
              {id: 'radio-input-test', value: 'radio-input-test-2_1'}]);
          });
        });
      });
    });
  });
});
