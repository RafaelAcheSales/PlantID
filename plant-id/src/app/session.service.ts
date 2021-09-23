import { Injectable, EventEmitter, Output } from '@angular/core';
import { Subject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class SessionService {
  private sidenavOpenSubject : Subject<boolean>;
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
    this.sidenavOpenSubject = new Subject<boolean>();
  }
  isLogged(): boolean {
    return this.storage.getItem("email") != null;
  }
  setLogin(email: string, password: string): void {
    if (!this.isLogged() || true) {
      this.storage.setItem("email", email);
      this.storage.setItem("password", password);
      this.toggleSideNav(true);
      
    } else {
      throw new Error("Already logged in");
      
    }
  }
  toggleSideNav(opening: boolean): void {
    console.log("toogle sidnav");
    
    this.sidenavOpenSubject.next(opening);
  }

  onSideNavToggle(): Observable<boolean> {
      return this.sidenavOpenSubject;
  }
  getLogin(): [any, any] {

    return [this.storage.getItem("email"), this.storage.getItem("password")]

  }
  clearLogin(): void {
    this.storage.removeItem("email");
    this.storage.removeItem("password");
    console.log("cleared login");
    this.toggleSideNav(false);
  }
}
