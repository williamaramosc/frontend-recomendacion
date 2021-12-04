import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public router: Router 
  ) { }

  iduser? : Number;

  ngOnInit(): void {
  }

  soyNuevo(e:any){
    this.router.navigate(['newUser']);
    
  }

  ingresar(e:any){
    localStorage.setItem('iduser', "1234" );
    this.router.navigate(['home']);
  }

}
