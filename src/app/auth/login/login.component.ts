import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogin: boolean = false;
  errorMessage;
  loginUrl = 'auth/user/login';

  constructor(private api: ApiService, private auth: AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.isUserLogin();
  }

  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value);
    this.api.postTypeRequest(this.loginUrl, form.value).subscribe((res: any) => {
    if (res.status) {
      console.log(res)
      this.auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
      this.auth.setDataInLocalStorage('token', res.token);
      this.router.navigate(['/products']);
    } else {
      }
      }, err => {
        this.errorMessage = err['error'].message;
      });
  }
  
  isUserLogin(){
    console.log(this.auth.getUserDetails())
    if(this.auth.getUserDetails() != null){
      this.isLogin = true;
    }
  }

  logout(){
    this.auth.clearStorage()
    this.router.navigate(['']);
  }
    
}
