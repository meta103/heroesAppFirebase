import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Heroe } from '../interfaces/heroe';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  firebaseUrl: string = 'https://heroesapp-3a48d.firebaseio.com/heroes.json';
  heroeUrl: string = 'https://heroesapp-3a48d.firebaseio.com/heroes/';

  constructor(private http: HttpClient) {}

  nuevoheroe(heroe: Heroe) {
    let body = JSON.stringify(heroe);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.firebaseUrl, body, { headers }).pipe(
      map(res => {
        return res.name;
      })
    );
  }

  actualizarHeroe(heroe: Heroe, $key: string) {
    let body = JSON.stringify(heroe);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let url = `${this.heroeUrl}/${$key}.json`;

    return this.http.put(url, body, { headers });
  }

  getHeroe(key$: string ){
    let url = `${this.heroeUrl}/${key$}.json`;

    return this.http.get(url);
  }

  getHeroes(){
     return this.http.get(this.firebaseUrl);
  }

  borrarHeroe(key$: string) {
    let url = `${this.heroeUrl}/${key$}.json`;

    return this.http.delete(url);
  }
}
