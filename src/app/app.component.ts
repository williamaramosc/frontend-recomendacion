import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from './core/services/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public _coreService: CoreService,
    public router: Router 
    ) {
  }

  ruta : any = this.router.url;

}
