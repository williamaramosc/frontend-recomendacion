import { Component, OnInit } from '@angular/core';
import { Book } from '../../interface/book_interface';
import { CoreService } from '../../core/services/core.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(
    public coreService : CoreService,
    public rutaActiva : ActivatedRoute
  ) { }

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
  
  librosUser?: Book[];
  librosPopulares? : Book[];
  librosRecomendados? : Book[] ;
  librosXlibro : Book[] = [];

  iduser : any ;
  buscador: String = '';

  /**
   * Imagen tamanio grande : 98x146
   * Imagen tamanio pequeño :  
   */
  ngOnInit(): void {
    this.buscador = this.rutaActiva.snapshot.params.buscar;
    this.buscador = this.buscador != undefined ? this.buscador.replace('%', ' ') : this.buscador;
    this.iduser = localStorage.getItem('iduser');
    
    
    this.getMostPopular();
    this.getBooksUser();
    this.getRecomendados();
    if(this.buscador != undefined){
        // this.getRecomendadosXLibro();
    }
    
  }


  async getBooksUser(){
    await this.coreService.getWithParams('/librosUsuario', this.iduser).subscribe(
        (res: any) => {
          this.librosUser = res;
        },
        (err: any) => {
          console.log(err);
        }
      )
  }

  async getMostPopular(){
    await this.coreService.get('/librosPopulares').subscribe(
        (res: any) => {
          this.librosPopulares = res;
        },
        (err: any) => {
          console.log(err);
        }
      )
  }

  async getRecomendados(){
    await this.coreService.getWithParams('/recomendadosColab', this.iduser).subscribe(
        (res: any) => {
          this.librosRecomendados = res;
        },
        (err: any) => {
          console.log(err);
        }
      )
  }


  
  async getRecomendadosXLibro(){
    await this.coreService.getWithParams('/recomendadosCont', this.buscador).subscribe(
        (res: any) => {
          this.librosXlibro = res;
        },
        (err: any) => {
          console.log(err);
        }
      )
  }

}
