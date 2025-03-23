import { Component } from '@angular/core';
import { GroundsService } from 'src/app/services/grounds/grounds.service';
import { pagination } from 'src/app/utility/shared/constant/pagination.constant';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';
import { TournamentService } from 'src/app/services/tournaments/tournament.service';


@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent {

  showLoader: boolean = false;
  tournamentAllList: any = [];
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
    // The route is defined in the child routes, so we need to use the correct path
    this.router.navigate(['../create-tournament'], { relativeTo: this.route });
  }

  getAllTournamentsByStatus(status: string) {
    this.showLoader = true;
    this.tournametservice.getTournamentList(status).subscribe((response: any) => {
      this.showLoader = false;
      if (response?.status) {
        this.tournamentAllList = response.data;
        this.totalRecords = response?.totalRecords;
      } else {
        this.notificationService.showError(response?.message);
      }
    },
      (error) => {
        this.notificationService.showError(error?.message);
        this.showLoader = false;
      }
    );
  }
}
