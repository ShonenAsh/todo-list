import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Player } from './Player.model';

@Injectable()
export class PlayerService {
  selectedPlayer: Player;
  Players: Player[];
  readonly baseURL = 'http://localhost:3000/Players';

  constructor(private http: HttpClient) { }

  postPlayer(ply: Player) {
    return this.http.post(this.baseURL, ply);
  }

  getPlayerList() {
    return this.http.get(this.baseURL);
  }

  putPlayer(ply: Player) {
    return this.http.put(this.baseURL + `/${ply._id}`, ply);
  }

  deletePlayer(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
