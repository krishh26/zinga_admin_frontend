import { Component, OnInit } from '@angular/core';
import { GroundsService } from 'src/app/services/grounds/grounds.service';
import { pagination } from 'src/app/utility/shared/constant/pagination.constant';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';
import { TournamentService } from 'src/app/services/tournaments/tournament.service';
import Swal from 'sweetalert2';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { FormControl } from '@angular/forms';

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
export class TournamentsComponent implements OnInit {

  showLoader: boolean = false;
  tournamentAllList: Tournament[] = [];
  filteredTournaments: Tournament[] = [];
  page: number = pagination.page;
  pagesize = pagination.itemsPerPage;
  totalRecords: number = pagination.totalRecords;
  currentStatus: string = 'all';
  searchQuery: string = '';
  cityFilter: string = '';
  dateFilter: string = '';
  uniqueCities: string[] = [];
  private searchSubject = new Subject<string>();
  myControl = new FormControl();
  searchText: any;

  constructor(
    private tournametservice: TournamentService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private authservice: AuthServiceService,
  ) {
    // Set up the search subject with debounce
    this.searchSubject.pipe(
      debounceTime(500), // Wait 500ms after the last event before emitting
      distinctUntilChanged() // Only emit if the value has changed
    ).subscribe(() => {
      this.applyFilters();
    });
  }

  ngOnInit(): void {
    // Reset all filters on page load
    this.searchQuery = '';
    this.cityFilter = '';
    this.dateFilter = '';
    this.myControl.valueChanges.subscribe((res: any) => {
      let storeTest = res;
      this.searchText = res.toLowerCase();
    });
    // Subscribe to query parameters
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

  applyFilters(): void {
    let filtered = [...this.tournamentAllList];

    // Apply search filter
    if (this.searchQuery) {
      const searchLower = this.searchQuery.toLowerCase();
      filtered = filtered.filter(tournament =>
        tournament.seriesName.toLowerCase().includes(searchLower) ||
        tournament.tournamentId.toLowerCase().includes(searchLower)
      );
    }

    // Apply city filter
    if (this.cityFilter) {
      filtered = filtered.filter(tournament =>
        tournament.venues.some(venue => venue.city === this.cityFilter)
      );
    }

    // Apply date filter
    if (this.dateFilter) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      filtered = filtered.filter(tournament => {
        const tournamentDate = new Date(tournament.startDate);
        tournamentDate.setHours(0, 0, 0, 0);

        switch (this.dateFilter) {
          case 'today':
            return tournamentDate.getTime() === today.getTime();
          case 'week':
            const weekAgo = new Date(today);
            weekAgo.setDate(today.getDate() - 7);
            return tournamentDate >= weekAgo && tournamentDate <= today;
          case 'month':
            const monthAgo = new Date(today);
            monthAgo.setMonth(today.getMonth() - 1);
            return tournamentDate >= monthAgo && tournamentDate <= today;
          case 'year':
            const yearAgo = new Date(today);
            yearAgo.setFullYear(today.getFullYear() - 1);
            return tournamentDate >= yearAgo && tournamentDate <= today;
          default:
            return true;
        }
      });
    }

    this.filteredTournaments = filtered;
    this.totalRecords = filtered.length;
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.cityFilter = '';
    this.dateFilter = '';
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { status: this.currentStatus },
      queryParamsHandling: 'merge'
    });
  }

  getAllTournamentsByStatus(status: string) {
    this.showLoader = true;
    this.tournametservice.getTournamentList(status).subscribe((response: ApiResponse) => {
      this.showLoader = false;
      if (response?.status) {
        this.tournamentAllList = response.data;
        this.filteredTournaments = [...this.tournamentAllList];
        this.totalRecords = response?.totalRecords || 0;
        this.updateUniqueCities();
        this.applyFilters(); // Apply any existing filters
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

  private updateUniqueCities(): void {
    const cities = new Set<string>();
    this.tournamentAllList.forEach(tournament => {
      tournament.venues.forEach(venue => {
        if (venue.city) {
          cities.add(venue.city);
        }
      });
    });
    this.uniqueCities = Array.from(cities).sort();
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

  deleteTournament(tournamentId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this tournament?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00B96F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tournametservice.deleteTournament(tournamentId).subscribe({
          next: (response) => {
            this.notificationService.showSuccess('Tournament deleted successfully');
            this.getAllTournamentsByStatus(this.currentStatus);
          },
          error: (error) => {
            console.error('Error deleting tournament:', error);
            this.notificationService.showError(error?.error?.message || 'Failed to delete tournament');
          }
        });
      }
    });
  }

  // Add new method for handling search input
  onSearchInput(): void {
    this.applyFilters();
  }
}
