import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logged_in: boolean = false;
  login_or_account: string = "";
  sign_up_or_sign_out: string = "";
  login_or_account_href: string = "";
  sign_up_or_sign_out_href: string = "";
  LoggedObservable: Observable<boolean> = new Observable<boolean>();

  constructor(private service: SessionService) { 
      this.checkState();
    }

  checkState() {
    // alert("chck stat");
    if (this.service.isLogged()) {
      this.login_or_account = "account";
      this.login_or_account_href = "/home";
      this.sign_up_or_sign_out = "sign_out";
      this.sign_up_or_sign_out_href = "/home";
      this.logged_in = true;
    } else {
      this.login_or_account = "login";
      this.login_or_account_href = "/login"
      this.sign_up_or_sign_out = "sign_up"
      this.sign_up_or_sign_out_href = "/signup"
      this.logged_in = false;
    }
  }
  onLogin() {
    this.checkState();

  }
  onSignInOut(): void {
    this.checkState();
    if (this.logged_in) {
      this.service.clearLogin();
    }
    this.checkState();
  }
  ngOnInit(): void {
    this.service.onSideNavToggle().subscribe(
      (opening) => {
        
        if (opening) {
              this.checkState();
          } else {
              this.checkState();
          }
      }
  );
  }


}
