import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent implements OnInit {
  userForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobile: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  // Getter for easy access to form fields
  get f() {
    return this.userForm.controls;
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.userForm.controls).forEach(key => {
        const control = this.userForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;

    const userData = this.userForm.value;

    this.userService.createUser(userData)
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;
          if (response.status) {
            this.notificationService.showSuccess('User created successfully');
            this.router.navigate(['/users']);
          } else {
            this.notificationService.showError(response.message || 'Failed to create user');
          }
        },
        error: (error) => {
          this.isSubmitting = false;
          this.notificationService.showError(error.message || 'An error occurred while creating user');
        }
      });
  }
}
