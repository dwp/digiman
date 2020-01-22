import { Digiman } from '../components/digiman.component';

export class DigimanInitialiser {
  constructor() {
    window.digiman = Digiman;

    let digimans = Array.from(document.querySelectorAll('.digiman'));
    if (digimans.length > 0) {
      digimans.forEach((digiman) => {
        new Digiman(digiman as HTMLElement);
      });
    }
  }
}