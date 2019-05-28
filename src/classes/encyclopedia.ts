import { ReferenceItem } from '../classes/referenceItem';
import { positiveInteger } from '../decorators';

export default class Encyclopedia extends ReferenceItem {
  private _copies: number;

  @positiveInteger
  get copies() {
    return this._copies;
  }

  set copies(value: number) {
    this._copies = value;
  }

  constructor(newTitle: string, newYear: number, public edition: number) {
    super(newTitle, newYear);
  }

  printItem(): void {
    super.printItem();
    console.log(`Edition: ${this.edition} (${this.year})`);
  }

  printCitation(): void {
    console.log(`${this.title} - ${this.year}`);
  }
}
