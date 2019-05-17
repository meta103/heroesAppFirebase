import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
// import { Heroe } from 'src/app/interfaces/heroe';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes: any[] = [];
  loading = true;

  constructor(private _heroesService: HeroesService ) {
    this._heroesService.getHeroes()
    .subscribe(data => {
      setTimeout(() => {
        this.loading = false;
        this.heroes = data;
      }, 3000);
    });
   }

  ngOnInit() {
  }

  borrarHeroe(key$: string) {
    this._heroesService.borrarHeroe(key$)
    .subscribe(respuesta => {
      // Segun la doc de la firebase, si retorna null es que ha habido éxito, entonces:
      if (respuesta ) {
        console.error(respuesta);
      } else {
        // Borramos el héroe de la variable de este componente. El pipe se encargará del ciclo de renderizacion tras su borrado!
        delete this.heroes[key$];
      }
    })
  }

}
