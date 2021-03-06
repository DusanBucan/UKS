import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate{


    constructor(){
    }

    canActivate() {
        var loggedUser = JSON.parse(localStorage.getItem("currentUser") || '{}');
        if (loggedUser !== '{}' && loggedUser["token"]!==undefined) {
            return true;
        }
        return false;
    }
}