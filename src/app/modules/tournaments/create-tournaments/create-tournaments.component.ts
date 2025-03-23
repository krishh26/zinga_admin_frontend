import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GroundsService } from 'src/app/services/grounds/grounds.service';
import { TournamentService } from 'src/app/services/tournaments/tournament.service';
import { UserService } from 'src/app/services/user/user.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-create-tournaments',
  templateUrl: './create-tournaments.component.html',
  styleUrls: ['./create-tournaments.component.css']
})
export class CreateTournamentsComponent implements OnInit {
  tournamentForm: FormGroup;
  venues: any[] = [];
  umpires: any[] = [];
  isSubmitting = false;
  tournamentTypes = ['Warriors Cup', 'Champions League', 'Premier League', 'Other'];
  formats = ['T20', 'ODI', 'Test', 'T10'];
  matchTypes = ['T20', 'ODI', 'Test', 'T10'];
  ballTypes = ['white', 'red', 'pink'];
  pitchTypes = ['hard', 'turf', 'mat'];

  constructor(
    private fb: FormBuilder,
    private groundsService: GroundsService,
    private userService: UserService,
    private tournamentService: TournamentService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.tournamentForm = this.fb.group({
      seriesName: ['', [Validators.required]],
      tournamentType: ['Warriors Cup', [Validators.required]],
      startDate: ['', [Validators.required]],
      teamLimit: [4, [Validators.required, Validators.min(2)]],
      venues: [[], [Validators.required]],
      cost: [5000, [Validators.required, Validators.min(0)]],
      format: ['T20', [Validators.required]],
      stayOnScreen: [true],
      matchStartTime: ['09:00', [Validators.required]],
      matchDuration: [300, [Validators.required, Validators.min(30)]],
      matchGapHours: [1, [Validators.required, Validators.min(0)]],
      matchType: ['T20', [Validators.required]],
      oversPerInnings: [20, [Validators.required, Validators.min(1)]],
      oversPerBowler: [4, [Validators.required, Validators.min(1)]],
      ballType: ['white', [Validators.required]],
      pitchType: ['hard', [Validators.required]],
      umpires: [[], [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadVenues();
    this.loadUmpires();
  }

  loadVenues(): void {
    this.groundsService.getAllGround().subscribe({
      next: (response) => {
        if (response && response.data) {
          this.venues = response.data;
        }
      },
      error: (error) => {
        console.error('Error loading venues:', error);
        this.notificationService.showError('Failed to load venues');
      }
    });
  }

  loadUmpires(): void {
    this.userService.getUserList().subscribe({
      next: (response) => {
        if (response && response.data) {
          // Filter users who are umpires (assuming there's a role property)
          this.umpires = response.data.filter((user: any) => user.role === 'umpire');
        }
      },
      error: (error) => {
        console.error('Error loading umpires:', error);
        this.notificationService.showError('Failed to load umpires');
      }
    });
  }

  onSubmit(): void {
    if (this.tournamentForm.invalid) {
      Object.keys(this.tournamentForm.controls).forEach(key => {
        const control = this.tournamentForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      this.notificationService.showError('Please fill all required fields correctly');
      return;
    }

    this.isSubmitting = true;
    this.tournamentService.createTournament(this.tournamentForm.value).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.notificationService.showSuccess('Tournament created successfully');
        this.router.navigate(['/tournaments']);
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Error creating tournament:', error);
        this.notificationService.showError(error.message || 'Failed to create tournament');
      }
    });
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1 && o2 ? o1._id === o2._id : o1 === o2;
  }
}
