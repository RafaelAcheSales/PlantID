import { Injectable, EventEmitter, Output } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SessionService {
  @Output() userChangeEvent: EventEmitter<boolean> = new EventEmitter(true);
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }
  isLogged(): boolean {
    return this.storage.getItem("email") != null;
  }
  setLogin(email: string, password: string): void {
    if (!this.isLogged() || true) {
      this.userChangeEvent.emit(true);
      this.storage.setItem("email", email);
      this.storage.setItem("password", password);
      
    } else {
      throw new Error("Already logged in");
      
    }
  }
  getLogin(): [any, any] {

    return [this.storage.getItem("email"), this.storage.getItem("password")]

  }
  clearLogin(): void {
    this.storage.removeItem("email");
    this.storage.removeItem("password");
    console.log("cleared login");
  }
}
