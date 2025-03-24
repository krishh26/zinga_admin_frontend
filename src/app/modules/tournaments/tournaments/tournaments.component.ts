import { Component } from '@angular/core';
import { GroundsService } from 'src/app/services/grounds/grounds.service';
import { pagination } from 'src/app/utility/shared/constant/pagination.constant';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';
import { TournamentService } from 'src/app/services/tournaments/tournament.service';

interface Tournament {
  _id: string;
  tournamentId: string;
  seriesName: string;
  tournamentType: string;
  status: string;
  startDate: string;
  teamLimit: number;
  venues: Array<{
    _id: string;
    name: string;
    address1: string;
    city: string;
  }>;
  cost: number;
  registeredTeams: Array<any>;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: Tournament[];
  totalRecords?: number;
}

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent {

  showLoader: boolean = false;
  tournamentAllList: Tournament[] = [];
  page: number = pagination.page;
  pagesize = pagination.itemsPerPage;
  totalRecords: number = pagination.totalRecords;
  currentStatus: string = 'all';

  constructor(
    private tournametservice: TournamentService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private authservice: AuthServiceService,
  ) {
  }

  ngOnInit(): void {
    // Check if there's a status in the URL
    this.route.queryParams.subscribe(params => {
      this.currentStatus = params['status'] || 'all';
      this.getAllTournamentsByStatus(this.currentStatus);
    });
  }

  getAllTournamentLists() {
    this.getAllTournamentsByStatus('all');
  }

  navigateWithStatus(status: string) {
    // Update the URL with the status query parameter without navigating away
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { status: status },
      queryParamsHandling: 'merge', // Preserve other query params
    });

    // The subscription in ngOnInit will handle loading the tournaments
  }

  navigateToCreateTournament() {
    this.router.navigate(['../create-tournament'], { relativeTo: this.route });
  }

  getAllTournamentsByStatus(status: string) {
    this.showLoader = true;
    this.tournametservice.getTournamentList(status).subscribe((response: ApiResponse) => {
      this.showLoader = false;
      if (response?.status) {
        this.tournamentAllList = response.data;
        this.totalRecords = response?.totalRecords || 0;
      } else {
        this.notificationService.showError(response?.message);
      }
    },
      (error: any) => {
        this.notificationService.showError(error?.message);
        this.showLoader = false;
      }
    );
  }

  getStatusBadgeClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'live':
        return 'success';
      case 'upcoming':
        return 'warning';
      case 'completed':
        return 'secondary';
      default:
        return 'primary';
    }
  }

  viewTournament(tournament: Tournament) {
    // Navigate to tournament details page
    this.router.navigate(['../tournament-details', tournament._id], { relativeTo: this.route });
  }

  editTournament(tournament: Tournament) {
    // Navigate to edit tournament page
    this.router.navigate(['../edit-tournament', tournament._id], { relativeTo: this.route });
  }

  deleteTournament(tournament: Tournament) {
    if (confirm('Are you sure you want to delete this tournament?')) {
      this.tournametservice.deleteTournament(tournament._id).subscribe({
        next: (response: ApiResponse) => {
          if (response?.status) {
            this.notificationService.showSuccess('Tournament deleted successfully');
            this.getAllTournamentsByStatus(this.currentStatus);
          } else {
            this.notificationService.showError(response?.message);
          }
        },
        error: (error: any) => {
          this.notificationService.showError(error?.message || 'Failed to delete tournament');
        }
      });
    }
  }
}
