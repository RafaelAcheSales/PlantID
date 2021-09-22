import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  LoggedObservable: Observable<boolean> = new Observable<boolean>();

  constructor(private service: SessionService) { 

    }

  ngOnInit(): void {
    this.service.userChangeEvent.subscribe(this.handleLogEvent);
  }
  handleLogEvent(isLogged:boolean): void {
    this.LoggedObservable =  new Observable(observer=>observer.next(isLogged));
    // alert("logevent");
  }
  

}
