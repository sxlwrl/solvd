'use strict';

/**
 * Base book class
 */

class Book {
    /**
     * Constructor function that receives values and sets them into parameters
     *
     * All properties are protected which means they are only accessible from the child class
     *
     * @param title - book title
     * @param author - book author
     * @param isbn - book isbn
     * @param price - book price
     * @param availability - book availability
     */
    constructor(title, author, isbn, price, availability) {
        this._title = title;
        this._author = author;
        this._isbn = isbn;
        this._price = price;
        this._availability = availability;
    };

    /**
     * Methods:
     *
     * get title - getter that returns a title
     * get author - getter that returns an author
     * get isbn - getter that returns an isbn
     * get price - getter that returns a price
     * get isAvailable - getter that returns whether the book is available
     * get availability - getter that returns amount of books
     * set availability - setter that sets amount of books
     */

    get title() {
        return this._title;
    };

    get author() {
        return this._author;
    };

    get isbn() {
        return this._isbn;
    };

    get price() {
        return this._price;
    };

    get isAvailable() {
        return !!this._availability;
    };

    get availability() {
        return this._availability;
    };

    set availability(value) {
        this._availability = value;
    };
}

/**
 * FictionBook is a class, that extends the base class of a book
 */

class FictionBook extends Book {
    constructor(title, author, isbn, price, availability) {
        super(title, author, isbn, price, availability);
        this.type = 'someFictionType';
    };
}

/**
 * NotFictionBook is a class, that extends the base class of a book
 */

class NotFictionBook extends Book {
    constructor(title, author, isbn, price, availability) {
        super(title, author, isbn, price, availability);
        this.type = 'anotherType';
    };
}

/**
 * User class
 */

class User {
    #name;
    #email;
    #userId;

    /**
     * Constructor function that receives values and sets them into parameters
     *
     * All properties are private which means they are only accessible from this class
     *
     * @param userId - user id
     * @param name - user's name
     * @param email - user's email
     */

    constructor(userId, name, email) {
        this.#userId = userId;
        this.#name = name;
        this.#email = email;
    };

    /**
     * Function that returns an object with information about user
     */

    get userInformation() {
        return {id: this.#userId, name: this.#name, email: this.#email};
    };
}

/**
 * Cart class
 */

class Cart {
    /**
     * Constructor function that receives values and sets them into parameters
     *
     * @param user - user
     *
     * @property books - array with books that has been added to a cart
     */
    constructor(user) {
        this._user = user;
        this._books = [];
    };

    /**
     * Method that allows to add a book to a cart
     *
     * @param book
     */

    setBook(book) {
        if (!book.isAvailable) {
            return `Book ${book.title} is not available`;
        }

        this._books.push(book);
        book.availability -= 1;

        return `Book ${book.title} has been added to cart`;
    };

    /**
     * Method that allows to remove a book from a cart
     *
     * @param isbn
     */

    removeBook(isbn) {
        if (this._books.length === 0) {
            return `Your cart is empty`;
        }
        const foundBookIndex = this._books.findLastIndex(book => book.isbn === isbn);
        const foundBook = this._books[foundBookIndex];
        foundBook.availability++;
        this._books.splice(foundBookIndex, 1);

        return `Book ${foundBook.title} has been removed from cart`;
    };

    /**
     * Method that calculates a total price of a cart
     */

    getTotalPrice() {
        return this._books.reduce((total, book) => total + book.price, 0);
    };

    /**
     * Method that returns the contents of a cart
     */

    get cart() {
        return this._books;
    };
}

/**
 * Order class
 */

class Order {
    /**
     * Constructor function that receives values and sets them into parameters
     *
     * @param user - user
     * @param cart - cart
     */
    constructor(user, cart) {
        this._user = user;
        this._cart = cart;
    };

    /**
     * Method that returns all information about user's order
     */

    get information() {
        return {
            user: this._user.userInformation,
            cart: this._cart.cart,
            totalPrice: this._cart.getTotalPrice()
        };
    };
}

/**
 * Store class
 */

class Store {
    /**
     * @property books - array with books as database imitation
     */
    constructor() {
        this._books = [];
    };

    /**
     * Method that adds a book to database
     *
     * @param book
     */

    storeBook(book) {
        this._books.push(book);
    };

    /**
     * Method that searches a book in database
     *
     * @param name
     * @param author
     */

    searchBook(name, author = null) {
        return this._books.filter(book =>
            book._title
                .toLowerCase()
                .includes(name.toLowerCase()) ||
            book._author
                .toLowerCase()
                .includes(name.toLowerCase()));
    };

    /**
     * Method that returns all books stored in database
     */

    getAllBooks() {
        return this._books;
    };
}

const bookDB = new Store();

bookDB.storeBook(new Book('Book-1', 'Author 1', '1a2b3c', 12, 1));
bookDB.storeBook(new Book('Book-2', 'Author 1', '1a2b4d', 9, 4));
bookDB.storeBook(new FictionBook('Book-3', 'Author 2', '1a2b53', 19, 3));
bookDB.storeBook(new NotFictionBook('Book-4', 'Author 2', '2b4d5e', 7, 2));

const book_1 = bookDB.searchBook('Book-1')[0];
const book_2 = bookDB.searchBook('Book-2')[0];
const book_3 = bookDB.searchBook('Book-3')[0];
const book_4 = bookDB.searchBook('Book-4')[0];

const user_1 = new User(1, 'user', 'user@test.com');
const user_2 = new User(2, 'anotherUser', 'another_user@test.com');

const cart_1 = new Cart(user_1);
const cart_2 = new Cart(user_2);

console.log(cart_1.setBook(book_1));
console.log(cart_1.setBook(book_3));
console.log(cart_1.setBook(book_4));
console.log(cart_1.removeBook('1a2b3c'));
console.log(cart_1.setBook(book_1));
console.log(cart_1.cart);

cart_1.getTotalPrice();     // 38

const order_1 = new Order(user_1, cart_1);

console.log(order_1.information);

