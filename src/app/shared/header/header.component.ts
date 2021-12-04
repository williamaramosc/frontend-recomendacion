import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from '../../core/services/core.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( 
    public coreService: CoreService,
    public router: Router 
  ) { 

  }

  buscar : any;
  
  
  ngOnInit(): void {    
  }

  ruta(){
    return this.router.url
  }

  salir(){
    localStorage.clear();
    this.router.navigate(["login"]);
  }


  buscarxLibro(){   
    this.router.navigate(["home/"+this.buscar]);
  }

}
