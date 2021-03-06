import { timeout } from '../decorators';

abstract class ReferenceItem {
  private _publisher: string;

  static department: string = 'Fiction Literature';

  get publisher(): string {
    return this._publisher.toUpperCase();
  }

  set publisher(newPublisher: string) {
    this._publisher = newPublisher;
  }

  constructor(public title: string, protected year: number) {
    console.log('Creating a new ReferenceItem...');
  }

  @timeout(3000)
  printItem(): void {
    console.log(`${this.title} was published in ${this.year}`);
    console.log(`Department: ${ReferenceItem.department}`);
  }

  abstract printCitation(): void;
}

export { ReferenceItem };