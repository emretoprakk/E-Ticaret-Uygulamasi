import { Component, inject } from '@angular/core';
import { UserStorageService } from './services/storage/user-storage.service';
import { Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ETicaretWeb';

  
  constructor(private router:Router){}

  isCustomerLoggedIn : boolean = UserStorageService.isCustomerLoggedIn();
  isAdminLoggedIn : boolean = UserStorageService.isAdminLoggedIn();

  ngOnInit(): void{
    this.router.events.subscribe(event => {
      this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
      this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();

    })
  }

  logout() {
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }
} 