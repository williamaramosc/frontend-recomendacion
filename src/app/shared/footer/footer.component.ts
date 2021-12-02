import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  anio:number = new Date().getFullYear();

  constructor(
    public coreService: CoreService
  ) {

   }

  ngOnInit(): void {
  }

}
