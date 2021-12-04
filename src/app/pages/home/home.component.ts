import { Component, OnInit } from '@angular/core';
import { Book } from '../../interface/book_interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor() { }

  display : boolean = true;
  responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
  ];
  
  books: Book[] = [
    {
        "book_id": 1,
        "goodreads_book_id": 2767052,
        "authors": "Suzanne Collins",
        "original_publication_year": 2008.0,
        "title": "The Hunger Games (The Hunger Games, #1)",
        "average_rating": 4.34,
        "ratings_count": 4780653,
        "language_code": "eng",
        "image_url": "https://images.gr-assets.com/books/1447303603m/2767052.jpg"
    },
    {
        "book_id": 2,
        "goodreads_book_id": 3,
        "authors": "J.K. Rowling, Mary GrandPrÃ©",
        "original_publication_year": 1997.0,
        "title": "Harry Potter and the Sorcerer's Stone (Harry Potter, #1)",
        "average_rating": 4.44,
        "ratings_count": 4602479,
        "language_code": "eng",
        "image_url": "https://images.gr-assets.com/books/1474154022m/3.jpg"
    },
    {
        "book_id": 3,
        "goodreads_book_id": 41865,
        "authors": "Stephenie Meyer",
        "original_publication_year": 2005.0,
        "title": "Twilight (Twilight, #1)",
        "average_rating": 3.57,
        "ratings_count": 3866839,
        "language_code": "en-US",
        "image_url": "https://images.gr-assets.com/books/1361039443m/41865.jpg"
    },
    {
        "book_id": 4,
        "goodreads_book_id": 2657,
        "authors": "Harper Lee",
        "original_publication_year": 1960.0,
        "title": "To Kill a Mockingbird",
        "average_rating": 4.25,
        "ratings_count": 3198671,
        "language_code": "eng",
        "image_url": "https://images.gr-assets.com/books/1361975680m/2657.jpg"
    },
    {
        "book_id": 5,
        "goodreads_book_id": 4671,
        "authors": "F. Scott Fitzgerald",
        "original_publication_year": 1925.0,
        "title": "The Great Gatsby",
        "average_rating": 3.89,
        "ratings_count": 2683664,
        "language_code": "eng",
        "image_url": "https://images.gr-assets.com/books/1490528560m/4671.jpg"
    },
    {
        "book_id": 6,
        "goodreads_book_id": 11870085,
        "authors": "John Green",
        "original_publication_year": 2012.0,
        "title": "The Fault in Our Stars",
        "average_rating": 4.26,
        "ratings_count": 2346404,
        "language_code": "eng",
        "image_url": "https://images.gr-assets.com/books/1360206420m/11870085.jpg"
    },
    {
        "book_id": 7,
        "goodreads_book_id": 5907,
        "authors": "J.R.R. Tolkien",
        "original_publication_year": 1937.0,
        "title": "The Hobbit",
        "average_rating": 4.25,
        "ratings_count": 2071616,
        "language_code": "en-US",
        "image_url": "https://images.gr-assets.com/books/1372847500m/5907.jpg"
    },
    {
        "book_id": 8,
        "goodreads_book_id": 5107,
        "authors": "J.D. Salinger",
        "original_publication_year": 1951.0,
        "title": "The Catcher in the Rye",
        "average_rating": 3.79,
        "ratings_count": 2044241,
        "language_code": "eng",
        "image_url": "https://images.gr-assets.com/books/1398034300m/5107.jpg"
    }];

  /**
   * Imagen tamanio grande : 98x146
   * Imagen tamanio pequeño :  
   */
  ngOnInit(): void {
    console.log(localStorage.getItem('iduser'));
    
  }

}
