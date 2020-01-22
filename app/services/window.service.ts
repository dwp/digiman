import sanitise from '../utils/sanitisation.utils';

/*
* Returns Digiman definition or state from window object
*/

function checkStubData(): boolean {
  let isStubAvailable: boolean = false;

  if (window.digimanStub && window.digimanStub.length > 0) {
     window.digimanStub = sanitise.parseJSON(window.digimanStub);

     for (let i=0; i<window.digimanStub.length; i++) {
        window.digimanStub[i].definition = sanitise.parseJSON(window.digimanStub[i].definition);
        window.digimanStub[i].state = sanitise.parseJSON(window.digimanStub[i].state);
     }

     isStubAvailable = true;
  }

  return isStubAvailable;
}

function getDigiman(id: string): any {
  return window.digimanStub.find((digi: any) => digi.type === id);
}

function getFirstDigiman(): any {
  return window.digimanStub[0];
}

function removeDigiman(id: string) {
  window.digimanStub = window.digimanStub.filter((digi: any) => digi.type !== id);
}

export default {
  checkStubData,
  getFirstDigiman,
  getDigiman,
  removeDigiman
}