import { ValueBlock } from '../../app/subcomponents/value-block.component';

describe('ValueBlock', () => {
  let block;
  const READ_ONLY = true;
  const EDITABLE = false;

  let textareaData = (readOnly) => {
    return {
             id : "textarea-id",
             type: "TEXTAREA",
             label: "Textarea Label",
             readOnly: readOnly
           }
  };

  let textInputData = (readOnly) => {
    return {
      id : "input-id",
      type: "TEXT_INPUT",
      label: "Input Label",
      hint: "Input hint text",
      readOnly: readOnly
    }
  };

  afterEach(() => {
    block = null;
  });

  describe('When TEXT_INPUT block is created', () => {
    beforeEach(() => {
      block = new ValueBlock(textInputData(EDITABLE));
    });

    it('Then object html contains defined label', () => {
      expect(block.htmlNode.querySelector('#input-id')).not.toBe(null);
    });

    it('And object html contains defined hint', () => {
      expect(block.htmlNode.querySelector('#input-id-hint')).not.toBe(null);
    });

    it('And readOnly is set to false', () => {
      expect(block.readOnly).toBe(false);
    });

    it('And object html contains textarea HTML', () => {
      expect(block.htmlNode.querySelector('#input-id')).not.toBe(null);
    });

    it('And hint is as defined', () => {
      expect(block.hint).toBe('Input hint text');
    });

    it('And label is as defined', () => {
      expect(block.label).toBe('Input Label');
    });

    it('And id is as defined', () => {
      expect(block.id).toBe('input-id');
    });

    it('And type is TEXT_INPUT', () => {
      expect(block.type).toBe('TEXT_INPUT');
    });

    it('And value is empty', () => {
      expect(block.value).toBe('');
    });

    it('And options are undefined', () => {
      expect(block.options).toBe(undefined);
    });

    describe('When TEXT_INPUT state is set', () => {
      beforeEach(() => {
        block.setState('NEW_VALUE');
      });

      it('Then value is set to NEW_VALUE', () => {
        expect(block.value).toBe('NEW_VALUE');
      });

      it('And html is updated to reflect that change', () => {
        expect(block.htmlNode.querySelector('#input-id').value).toEqual('NEW_VALUE');
      });
    });

    describe('When TEXT_INPUT state is reset', () => {
      beforeEach(() => {
        block.setState('NEW_VALUE');
        block.resetState();
      });

      it('Then value is reset to empty string', () => {
        expect(block.value).toBe('');
      });

      it('And html is updated to reflect that change', () => {
        expect(block.htmlNode.querySelector('#input-id').value).toEqual('');
      });
    });
  });

  describe('When TEXTAREA block is created', () => {
    beforeEach(() => {
      block = new ValueBlock(textareaData(EDITABLE));
    });

    it('Then object html contains defined label', () => {
      expect(block.htmlNode.querySelector('label.govuk-label')).not.toBe(null);
    });

    it('And object html contains textarea', () => {
      expect(block.htmlNode.querySelector('textarea.govuk-textarea')).not.toBe(null);
    });

    it('And hint is undefined', () => {
      expect(block.hint).toBe(undefined);
    });

    it('And label is as defined', () => {
      expect(block.label).toBe('Textarea Label');
    });

    it('And id is as defined', () => {
      expect(block.id).toBe('textarea-id');
    });

    it('And type is TEXTAREA', () => {
      expect(block.type).toBe('TEXTAREA');
    });

    it('And value is empty string', () => {
      expect(block.value).toBe('');
    });

    it('And options are undefined', () => {
      expect(block.options).toBe(undefined);
    });

    describe('When TEXTAREA state is set', () => {
      beforeEach(() => {
        block.setState('NEW_VALUE');
      });

      it('Then value is set to NEW_VALUE', () => {
        expect(block.value).toBe('NEW_VALUE');
      });

      it('And html should be updated with new textarea value', () => {
        expect(block.htmlNode.querySelector('textarea.govuk-textarea').value).toEqual('NEW_VALUE');
      });
    });

    describe('When TEXT_INPUT state is reset', () => {
      beforeEach(() => {
        block.setState('NEW_VALUE');
        block.resetState();
      });

      it('Then value should be reset', () => {
        expect(block.value).toBe('');
      });

      it('And html is updated to reflect that change', () => {
        expect(block.htmlNode.querySelector('textarea.govuk-textarea').value).toEqual('');
      });
    });
  });

  describe('When TEXT_INPUT block is created with read only access', () => {
    beforeEach(() => {
      block = new ValueBlock(textInputData(READ_ONLY));
    });

    it('Then readOnly is set to true', () => {
      expect(block.readOnly).toBe(true);
    });
  });

  describe('When TEXTAREA block is created with read only access', () => {
    beforeEach(() => {
      block = new ValueBlock(textareaData(READ_ONLY));
    });

    it('Then readOnly is set to true', () => {
      expect(block.readOnly).toBe(true);
    });
  });
});