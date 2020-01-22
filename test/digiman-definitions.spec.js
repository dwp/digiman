import { Digiman } from '../app/components/digiman.component';

describe('Digiman Definitions', () => {
  let digimanComponents = [];
  let readDigimanComponents = [];
  let definitions = [];
  let body = document.querySelector('body');
  let definitionsIds = [];
  const emptyStateJSON = (type, version) => {
    return {
      "definitionType": type,
      "definitionVersion": version,
      "agentTodoId": "1234-1234-1234",
      "questionBlockData" : []
    };
  };
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

  let editFixture = (id) => {
    return `<div class="panel digiman digiman-test" id="${id}" data-read-only="false" data-state-endpoint="" data-general-error="Error">
              ${fixture}
            </div>`
  };

  let readFixture = (id) => {
    return `<div class="panel digiman digiman-test" id="${id}" data-read-only="true" data-state-endpoint="" data-general-error="Error">
              ${fixture}
            </div>`
  };

  beforeAll(() => {
    const obj = window.mocks;
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        definitions.push(obj[key]);
      }
    }

    if (definitions.length === 0) {
        throw new Error(`No digiman definitions found. Make sure you have added your definitions to the 'test/definitions/' directory.`);
    }

    definitions.forEach((definition) => {
      window.digimanStub = [{ 'definition': definition, 'state': emptyStateJSON(definition.id.type, definition.id.version), 'type': definition.id.type }];
      let id = definition.id.type + definition.id.version;
      let readId = definition.id.type + definition.id.version + '-read';
      definitionsIds.push(id);

      body.insertAdjacentHTML('beforeend', editFixture(id));
      body.insertAdjacentHTML('beforeend', readFixture(readId));
      let editElement = document.getElementById(id);
      let readElement = document.getElementById(readId);

      try {
        digimanComponents.push(new Digiman(editElement));
        readDigimanComponents.push(new Digiman(readElement));
      } catch (err) {
        throw new Error('Digiman definition for "' + definition.id.type + '" version "' + definition.id.version + '" did not compile correctly.\nDefinition might not be correct or you have made changes to the Digiman render component, which fails to load the older version of definition.');
      }
    });

    window.digimanStub = null;
  });

  afterAll(() => {
    Array.from(document.querySelectorAll('.digiman-test')).forEach((item) => {
      item.remove();
    });
  });

  describe('When definition files are loaded', () => {
    it('Then there is no duplicate definition types and versions', () => {
      expect(new Set(definitions).size).toBe(definitions.length);
    });

    it('And definition type and version is defined for each definition', () => {
      definitions.forEach((definition) => {
        expect(definition.id.type).toBeDefined();
        expect(definition.id.version).toBeDefined();
        expect(definition.questionBlocks).toBeDefined();
      });
    });

    describe('When Digiman component is loaded', () => {
      it('Then Digiman can be completed for each definition', () => {
        digimanComponents.forEach((digiman) => {
          let isEndBlock = false;
          let questionPointer = 'qb-start-id';

          while (!isEndBlock) {
            let questionObject = digiman.getQuestionSectionById(questionPointer);
            let digimanId = questionObject._digimanId;
            let questionNode = body.querySelector(`#${digimanId} #${digimanId}__${questionObject.id}`);
            let questionInput = questionNode.querySelector('[data-next-section-id]');
            questionPointer = questionInput.dataset.nextSectionId;
            questionInput.click();

            if (questionPointer === 'done') {
              isEndBlock = true;
            }
          }

          expect(isEndBlock).toBe(true);
        });
      });

      it('And at least one endpoint is defined for each digiman', () => {
        digimanComponents.forEach((digiman) => {
          let questionSections = digiman.questionSections;
          let isEndBlock = false;

          for (let i=0; i<questionSections.length; i++) {
            let options = questionSections[i].decisionBlock.options;
            for (let j=0; j<options.length; j++) {
              if (options[j].questionBlockId === 'done') {
                isEndBlock = true;
                break;
              }
            }

            if (isEndBlock) {
              break;
            }
          }

          if (!isEndBlock) {
            throw new Error(`Digiman: "${digiman.json_meta.definitionType}" version "${digiman.json_meta.definitionVersion}" does not have any endpoints.`);
          }

          expect(isEndBlock).toBe(true);
        });
      });
    });
  });
});
