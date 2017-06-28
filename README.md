# My Reads

A React application that make use of React components to manage the user
interface. Store your books and track what you're reading!

Live demo: https://ludovio.github.io/my-reads/

*note: due to the nature of github pages and how react-router-dom works,
reloading the page '/search' will not work*

# Installation

Clone the repository:

```sh
git clone https://github.com/LudoVio/my-reads.git
cd my-reads
```

Install dependencies:

```sh
npm install
```

Run the dev server:

```sh
npm start
```

Build production ready static assets:

```sh
npm run build
```


# React Components Structure

```sh
BooksApp
|-- BooksList
|   |-- BooksShelf
|      |-- BooksGrid
|          |-- Book
|-- BooksSearch
    |-- BooksGrid
        |-- Book
```
