import { Category } from './NamespaceDemo/enums';
import { Author, Book, Librarian, Logger } from './NamespaceDemo/interfaces';
import { ReferenceItem, UniversityLibrarian } from './NamespaceDemo/classes';

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
  const elt = document.getElementById(divName);
  elt.innerText = `Hello from ${name}`;
}

// -------------------------------------------------------------------------------------

function getAllBooks(): Book[] {
  const books: Book[] = [
    {
      id: 1,
      title: 'Refactoring JavaScript',
      author: 'Evan Burchard',
      available: true,
      category: Category.JavaScript,
    },
    {
      id: 2,
      title: 'JavaScript Testing',
      author: 'Liang Yuxian Eugene',
      available: false,
      category: Category.JavaScript,
    },
    {
      id: 3,
      title: 'CSS Secrets',
      author: 'Lea Verou',
      available: true,
      category: Category.CSS,
    },
    {
      id: 4,
      title: 'Mastering JavaScript Object-Oriented Programming',
      author: 'Andrea Chiarelli',
      available: true,
      category: Category.JavaScript,
    }
  ];

  return books;
}

function logFirstAvailable(books: any[] = getAllBooks()): void {
  const numberOfBooks: number = books.length;
  let titleFirstAvailable: string = '';

  for (const book of books) {
    if (book.available) {
      titleFirstAvailable = book.title;
      break;
    }
  }

  console.log(`Total Books: ${numberOfBooks}`);
  console.log(`Title of First Available Book: ${titleFirstAvailable}`);

}

function getBookTitlesByCategory(category: Category = Category.JavaScript): Array<string> {
  const books: any[] = getAllBooks();
  const titles: string[] = [];

  for (const book of books) {
    if (book.category === category) {
      titles.push(book.title);
    }
  }

  return titles;
}

function logBookTitles(titles: string[]): void {
  for (const title of titles) {
    console.log(title);
  }
}

function getBookByID(id: number): Book {
  const books = getAllBooks();
  return books.find(book => book.id === id);
}

function createCustomerID(name: string, id: number): string {
  return `${name}${id}`;
}

function createCustomer(name: string, age?: number, city?: string): void {
  console.log(`Customer name: ${name}`);

  if (age) {
    console.log(`Age: ${age}`);
  }

  if (city) {
    console.log(`City: ${city}`);
  }
}

function checkoutBooks(customer: string, ...bookIDs: number[]): string[] {
  console.log(`Customer name: ${customer}`);
  const titles: string[] = [];

  bookIDs.forEach(id => {
    const book = getBookByID(id);
    if (book && book.available) {
      titles.push(book.title);
    }
  });

  return titles;
}

function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(prop: string | boolean): string[] {
  const books = getAllBooks();
  switch (typeof prop) {
    case 'string': {
      return books
        .filter(book => book.author === prop)
        .map(book => book.title);
    }
    case 'boolean': {
      return books
        .filter(book => book.available === prop)
        .map(book => book.title);
    }
  }
}

const printBook = (book: Book): void => {
  console.log(`${book.title} by ${book.author}`);
};

class Encyclopedia extends ReferenceItem {
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

// =======================================================================================================

// Task 01
// logFirstAvailable(getAllBooks());

// Task 02
// const titles: string[] = getBookTitlesByCategory(Category.JavaScript);
// logBookTitles(titles);

// Task 03
// const titles: string[] = getBookTitlesByCategory(Category.JavaScript);
// titles.forEach((title: string, idx: number) => console.log(`${idx} - ${title}`));

// const book = getBookByID(1);
// console.log(book);

// Task 04
// let myID = createCustomerID('Ann', 10);
// console.log(myID);

// let idGenerator: (name: string, id: number) => string;
// idGenerator = (name: string, id: number) => `${name}${id}`;

// idGenerator = createCustomerID;
// myID = idGenerator('Boris', 20);
// console.log(myID);

// Task 05
// createCustomer('Anna');
// createCustomer('Boris', 30);
// createCustomer('Clara', 35, 'Kiev');

// const titles = getBookTitlesByCategory();
// console.log(titles);

// const titles1 = getBookTitlesByCategory(Category.CSS);
// console.log(titles1);

// logFirstAvailable();

// const myBooks: string[] = checkoutBooks('Anna', 1, 2, 4);
// console.log(myBooks);

// Task 06
// const checkedOutBooks: string[] = getTitles(true);
// checkedOutBooks.forEach(book => console.log(book));
// console.log(getTitles(true));
// console.log(getTitles("Lea Verou"));

// Task 07
// const myBook: Book = {
//   id: 5,
//   title: "Colors, Backgrounds, and Gradients",
//   author: "Eric A. Meyer",
//   available: true,
//   category: Category.CSS,
//   pages: 200,
//   markDamaged: (reason: string) => console.log(`Damaged: ${reason}`),
// };

// printBook(myBook);
// myBook.markDamaged('Missing back cover');

// Task 08
// const logDamage: Logger = (reason: string) => console.log(`Damage reported: ${reason}`);
// logDamage('stain');

// Task 09
// const favoriteAuthor: Author = {
//   name: 'Anna',
//   email: 'anna@gmail.com',
//   numBooksPublished: 10
// }

// const favoriteLibrarian: Librarian = {
//   name: 'Boris',
//   email: 'boris@tut.by',
//   department: 'Classical Literature',
//   assistCustomer: name => console.log(name),
// }

// Task 10
// const favoriteLibrarian: Librarian = new UniversityLibrarian();
// favoriteLibrarian.name = 'Anna';
// favoriteLibrarian.assistCustomer('Boris');

// Task 11
// const ref: ReferenceItem = new ReferenceItem('ReferenceItem Title', 2019);
// ref.printItem();
// ref.publisher = 'Rendom Publisher'; // setter works
// console.log(ref.publisher); // getter works

// Task 12-13
// const refBook: Encyclopedia = new Encyclopedia('WordPress', 2000, 10);
// refBook.printItem();
// console.log(refBook);
// refBook.printCitation();