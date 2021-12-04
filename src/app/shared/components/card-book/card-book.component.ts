import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/interface/book_interface';

@Component({
  selector: 'app-card-book',
  templateUrl: './card-book.component.html',
  styleUrls: ['./card-book.component.scss']
})
export class CardBookComponent implements OnInit {

  constructor() { }

  
  @Input() book?: Book;

  val2: number = 6;
  displayResponsive : boolean =false;

  ngOnInit(): void {
  }

}
