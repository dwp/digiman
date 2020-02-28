import { DecisionBlock } from '../../app/subcomponents/decision-block.component';

describe('DecisionBlock', () => {
  let block;
  const READ_ONLY = true;
  const EDITABLE = false;

  let checkboxData = (readOnly) => {
    return {
      id : "checkbox-id",
      label: "Select any option",
      type: "CHECKBOX",
      readOnly: readOnly,
      options: [
        { "text": "Hit me baby one more time", "questionBlockId": "HIT" }
      ]
    };
  }

  let radioData = (readOnly) => {
    return {
      id : "radio-id",
      label: "Select any option",
      type: "RADIO",
      readOnly: readOnly,
      options: [
        { "text": "One", "questionBlockId": "ONE", "optionId": "radio-one" },
        { "text": "Two", "questionBlockId": "TWO", "optionId": "radio-two" },
      ]
    };
  }

  afterEach(() => {
    block = null;
  });

  describe('When CHECKBOX block is created', () => {
    beforeEach(() => {
      block = new DecisionBlock(checkboxData(EDITABLE));
    });

    it('Then html object contains data-next-section-id', () => {
      expect(block.htmlNode.querySelector('#checkbox-id-HIT').dataset.nextSectionId).toEqual('HIT');
    });

    it('And type is CHECKBOX', () => {
      expect(block.type).toBe('CHECKBOX');
    });

    it('And readOnly is set to false', () => {
      expect(block.readOnly).toBe(false);
    });

    it('And isLastQuestion is set to false', () => {
      expect(block.isLastQuestion).toBe(false);
    });

    it('And options are as defined', () => {
      expect(block.options).toEqual([{ "text": "Hit me baby one more time", "questionBlockId": "HIT" }]);
    });

    it('And nextSection is set to empty string', () => {
      expect(block.nextSection).toBe('');
    });

    it('And selectedOptionId is set to empty string', () => {
      expect(block.selectedOptionId).toBe('');
    });

    describe('When CHECKBOX is state is set to HIT', () => {
      afterEach(() => {
        block.resetState();
      });

      beforeEach(() => {
        block.setState('HIT', true);
      });

      it('And options are updated to have HIT option selected', () => {
        let atmOption = block.options.find((option) => {
          return option['questionBlockId'] === 'HIT';
        });
        expect(atmOption.selected).toBe(true);
      });

      it('And nextSection returns HIT', () => {
        expect(block.nextSection).toBe('HIT');
      });

      it('And html is updated to reflect that change', () => {
        expect(block.htmlNode.querySelector('#checkbox-id-HIT').checked).toBe(true);
      });
    });

    describe('When CHECKBOX is state is set to HIT and then HIT is selected again', () => {
      afterEach(() => {
        block.resetState();
      });

      beforeEach(() => {
        block.setState('HIT', true);
        block.setState('HIT', false);
      });

      it('And options are updated to have HIT option unselected', () => {
        let atmOption = block.options.find((option) => {
          return option['questionBlockId'] === 'HIT';
        });
        expect(atmOption.selected).toBe(false);
      });

      it('And nextSection is set to empty string', () => {
        expect(block.nextSection).toBe('');
      });

      it('And html is updated to reflect that change', () => {
        expect(block.htmlNode.querySelector('#checkbox-id-HIT').checked).toBe(false);
      });
    });
  });

  describe('When RADIO block is created', () => {
    beforeEach(() => {
      block = new DecisionBlock(radioData(EDITABLE));
    });

    it('Then html object contains data-next-section-id', () => {
      expect(block.htmlNode.querySelector('#radio-id-ONE-radio-one').dataset.nextSectionId).toEqual('ONE');
    });

    it('And type is RADIO', () => {
      expect(block.type).toBe('RADIO');
    });

    it('And options are as defined', () => {
      expect(block.options).toEqual([{ "text": "One", "questionBlockId": "ONE", "optionId": "radio-one"}, { "text": "Two", "questionBlockId": "TWO", "optionId": "radio-two"}]);
    });

    it('And nextSection returns empty string', () => {
      expect(block.nextSection).toBe('');
    });

    describe('When RADIO state is set to ONE', () => {
      afterEach(() => {
        block.resetState();
      });

      beforeEach(() => {
        block.setState('ONE-radio-one', true);
      });

      it('Then options are updated to have ONE option selected', () => {
        let atmOption = block.options.find((option) => {
          return option['questionBlockId'] === 'ONE';
        });
        expect(atmOption.selected).toBe(true);
      });

      it('And nextSection returns ONE', () => {
        expect(block.nextSection).toBe('ONE');
      });

      it('And html is updated to reflect that change', () => {
        expect(block.htmlNode.querySelector('#radio-id-ONE-radio-one').checked).toBe(true);
      });
    });

    describe('When RADIO state is set to ONE and then ONE is selected again', () => {
      afterEach(() => {
        block.resetState();
      });

      beforeEach(() => {
        block.setState('ONE-radio-one', true);
        block.setState('ONE-radio-one', true);
      });

      it('Then option ONE is still selected', () => {
        let atmOption = block.options.find((option) => {
          return option['questionBlockId'] === 'ONE';
        });
        expect(atmOption.selected).toBe(true);
      });

      it('And nextSection returns ONE', () => {
        expect(block.nextSection).toBe('ONE');
      });
    });

    describe('When RADIO state is set to ONE and then TWO is selected', () => {
      afterEach(() => {
        block.resetState();
      });

      beforeEach(() => {
        block.setState('ONE-radio-one', true);
        block.setState('TWO-radio-two', true);
      });

      it('Then option TWO is selected', () => {
        let atmOption = block.options.find((option) => {
          return option['questionBlockId'] === 'TWO';
        });
        expect(atmOption.selected).toBe(true);
      });

      it('And option ONE is unselected', () => {
        let atmOption = block.options.find((option) => {
          return option['questionBlockId'] === 'ONE';
        });
        expect(atmOption.selected).toBe(false);
      });

      it('And nextSection returns TWO', () => {
        expect(block.nextSection).toBe('TWO');
      });
    });
  });

  describe('When RADIO block is created with read only access', () => {
    beforeEach(() => {
      block = new DecisionBlock(radioData(READ_ONLY));
    });

    it('Then readOnly is set to true', () => {
      expect(block.readOnly).toBe(true);
    });
  });

  describe('When CHECKBOX block is created with read only access', () => {
    beforeEach(() => {
      block = new DecisionBlock(radioData(READ_ONLY));
    });

    it('Then readOnly is set to true', () => {
      expect(block.readOnly).toBe(true);
    });
  });
});