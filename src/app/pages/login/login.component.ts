import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from '../../core/services/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public router: Router ,
    public coreService : CoreService 
  ) { }

  iduser? : Number;

  ngOnInit(): void {
  }

  soyNuevo(e:any){
    this.router.navigate(['newUser']);
    
  }

  async ingresar(e:any){
    await this.coreService.post('/login', this.iduser).subscribe(
      (res: any) => {
        console.log(res);
        if(res.user_id == 0){
          // Mensaje de error por hacer
        }else{
          localStorage.setItem('iduser', res.user_id );
          this.router.navigate(['home']);
        }
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

}
