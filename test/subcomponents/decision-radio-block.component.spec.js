import { DecisionRadioBlock } from '../../app/subcomponents/decision-radio-block.component';

describe('DecisionRadioBlock', () => {
  let block;
  const READ_ONLY = true;
  const EDITABLE = false;

  let radioData = (readOnly) => {
    return {
      id: "radio-id",
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

  describe('When RADIO block is created', () => {
    beforeEach(() => {
      block = new DecisionRadioBlock(radioData(EDITABLE));
    });

    it('Then html object contains data-next-section-id', () => {
      expect(block.htmlNode.querySelector('#radio-id-ONE-radio-one').dataset.nextSectionId).toEqual('ONE');
    });

    it('And type is RADIO', () => {
      expect(block.type).toBe('RADIO');
    });

    it('And options are as defined', () => {
      expect(block.options).toEqual([{ "text": "One", "questionBlockId": "ONE", "optionId": "radio-one" }, { "text": "Two", "questionBlockId": "TWO", "optionId": "radio-two" }]);
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
      block = new DecisionRadioBlock(radioData(READ_ONLY));
    });

    it('Then readOnly is set to true', () => {
      expect(block.readOnly).toBe(true);
    });
  });
});