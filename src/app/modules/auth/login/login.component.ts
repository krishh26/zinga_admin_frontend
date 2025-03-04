import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { BaseLogin } from 'src/app/utility/shared/common/base-login';
// import { jwtDecode } from "jwt-decode";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends BaseLogin implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  // showPassword = false;
  showLoader: boolean = false;
  loginUser: any;
  tokenDecode: any;
  loginDetails: any;

  constructor(
    private fb: FormBuilder,
    private authServiceService: AuthServiceService,
    private router: Router,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService,
  ) {
    super()
    this.loginUser = this.localStorageService.getLogger();

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]], //Validators.minLength(6)
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // Getter for easy access to form controls in the template
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginForm.valid) {
      this.showLoader = true;
      this.authServiceService.loginUser(this.loginForm.value).subscribe(
        (response) => {
          this.showLoader = false;
          this.localStorageService.setLoginToken(response?.data);
          this.showLoader = false;
          console.log(response?.data);
          this.tokenDecode = response?.data?.token;
          // const decoded = jwtDecode(this.tokenDecode);
           this.loginDetails = response?.data?.user;
          this.localStorageService.setLogger(this.loginDetails);
          this.router.navigate(['/user/home']);
          this.notificationService.showSuccess(
            response?.message || 'User login successfully'
          );
        },
        (error) => {
          this.showLoader = false;
          console.log('this is error', error);
          this.notificationService.showError(
            error?.error?.message || 'Something went wrong!'
          );
        }
      );
    }
  }

  togglePassword() {
    console.log('this is called');
    this.showPassword = !this.showPassword;
  }
}
