'use strict';

const bankAccount = {
    _balance: 1000,
    _formattedBalance: null,

    get formattedBalance() {
        return this._formattedBalance || `$${this._balance}`;
    },

    set balance(value) {
        this._balance = value;
        this._formattedBalance = `$${value}`;
    },

    transfer(sender, receiver, amount) {
        try {
            if (amount > this._balance) {
                throw new Error("You don't have enough money");
            }

            if (amount <= 0) {
                throw new Error('Incorrect amount');
            }

            sender.balance = sender._balance - amount;
            receiver.balance = receiver._balance + amount;

            return `Money has been transferred: $${amount}`;
        } catch (err) {
            return err.message;
        }
    }
};

const account1 = Object.create(bankAccount);
const account2 = Object.create(bankAccount);

console.log(account1.transfer(account1, account2, 100));    // Money has been transferred: $100

console.log(account1.formattedBalance);     // $900
console.log(account2.formattedBalance);     // $1100

console.log();

console.log(account2.transfer(account2, account1, 500));    // Money has been transferred: $500

console.log(account1.formattedBalance);     // $1400
console.log(account2.formattedBalance);     // $600

console.log();

console.log(account2.transfer(account2, account1, -500));   // Incorrect amount
console.log(account2.transfer(account2, account1, 5000));   // You don't have enough money