import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GroundsService } from 'src/app/services/grounds/grounds.service';

@Component({
  selector: 'app-create-grounds',
  templateUrl: './create-grounds.component.html',
  styleUrls: ['./create-grounds.component.css']
})
export class CreateGroundsComponent implements OnInit {
  groundForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private groundsService: GroundsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.groundForm = this.fb.group({
      name: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      coordinates: [''],
      googleLink: [''],
      status: [true]
    });
  }

  // Getter for easy access to form fields
  get f() {
    return this.groundForm.controls;
  }

  onSubmit(): void {
    if (this.groundForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.groundForm.controls).forEach(key => {
        const control = this.groundForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;

    const groundData = this.groundForm.value;

    this.groundsService.createGround(groundData)
      .subscribe({
        next: (response) => {
          console.log('Ground created successfully', response);
          this.isSubmitting = false;
          this.router.navigate(['/grounds']);
        },
        error: (error) => {
          console.error('Error creating ground', error);
          this.isSubmitting = false;
        }
      });
  }
}
