import { DecisionCheckboxBlock } from '../../app/subcomponents/decision-checkbox-block.component';

describe('DecisionCheckboxBlock', () => {
  let block;
  const READ_ONLY = true;
  const EDITABLE = false;

  let checkboxData = (readOnly) => {
    return {
      id: "checkbox-id",
      label: "Select any option",
      type: "CHECKBOX",
      readOnly: readOnly,
      options: [
        { "text": "Hit me baby one more time", "questionBlockId": "HIT" }
      ]
    };
  }

  afterEach(() => {
    block = null;
  });

  describe('When CHECKBOX block is created', () => {
    beforeEach(() => {
      block = new DecisionCheckboxBlock(checkboxData(EDITABLE));
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
    });
  });

  describe('When CHECKBOX block is created with read only access', () => {
    beforeEach(() => {
      block = new DecisionCheckboxBlock(checkboxData(READ_ONLY));
    });

    it('Then readOnly is set to true', () => {
      expect(block.readOnly).toBe(true);
    });
  });
});