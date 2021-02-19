import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Team } from '../model/team';
@Injectable({
  providedIn: 'root',
})
export class TeamService {
  teamsUrl: string;
  constructor(private http: HttpClient) {
    this.teamsUrl = environment.url + 'api/teams/';
  }


  createTeam(team: Team): Observable<object> {
    return this.http.post(`${this.teamsUrl}`, team);
  }

  getTeams() : Observable<Array<Team>>{
    return this.http.get<Array<Team>>(this.teamsUrl);
  }

  deleteTeam(id: number): Observable<object> {
    
    return this.http.delete(`${this.teamsUrl}` + id + '/');
  }

  addProjectToTeam(projName: string, id : number): Observable<any> {
    
    return this.http.get(`${this.teamsUrl}add-project/` + projName + '/'+id+"/");
  }
}
