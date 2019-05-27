import * as Interfaces from '../NamespaceDemo/interfaces';
import { sealed, logger, writable } from '../decorators';

@logger
@sealed('UniversityLibrarian')
export class UniversityLibrarian implements Interfaces.Librarian {
  name: string;
  email: string;
  department: string;

  assistCustomer(custName: string): void {
    console.log(`${this.name} is assisting ${custName}`);
  }

  @writable(true)
  assistFaculty(): void {
    console.log(`Assisting faculty`);
  }

  @writable(false)
  teachCommunity(): void {
    console.log(`Teaching community`);
  }
}
