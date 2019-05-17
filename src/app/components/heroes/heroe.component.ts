import { Component, OnInit } from '@angular/core';
import { Heroe } from 'src/app/interfaces/heroe';
import { HeroesService } from 'src/app/services/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {
  heroe: Heroe = {
    nombre: '',
    bio: '',
    casa: 'Marvel'
  };

  nuevo: boolean = false;
  id: string;

  constructor(
    private _heroeService: HeroesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params
    .subscribe(parametros => {
      this.id = parametros.id;
      if (this.id !== "nuevo") {
        this._heroeService.getHeroe(this.id)
        .subscribe(data => this.heroe = data);
      }
    });
  }

  ngOnInit() {}

  guardar() {
    if (this.id === "nuevo") {
      this._heroeService.nuevoheroe(this.heroe).subscribe(
        data => {
          this.router.navigate(['/heroe', data]);
        },
        error => console.error(error)
      );
    } else {
      this._heroeService.actualizarHeroe(this.heroe, this.id).subscribe(
        data => {
          console.log(data);
        },
        error => console.error(error)
      );
    }

  }

  agregarNuevo(forma: NgForm) {
    this.router.navigate(['/heroe', 'nuevo']);

    // Para dejar el form en su valor por defecto pero que me deje a Marvel en la seleccion de casa
    forma.reset({
      casa: 'Marvel'
    });
  }
}
