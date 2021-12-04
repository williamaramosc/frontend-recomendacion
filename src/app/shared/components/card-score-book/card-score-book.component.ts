import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/interface/book_interface';

@Component({
  selector: 'app-card-score-book',
  templateUrl: './card-score-book.component.html',
  styleUrls: ['./card-score-book.component.scss']
})
export class CardScoreBookComponent implements OnInit {

  constructor() { }

  @Input() book?: Book;

  val2: number = 6;


  ngOnInit(): void {
  }

}
