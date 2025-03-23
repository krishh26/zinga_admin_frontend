import { Component } from '@angular/core';
import { GroundsService } from 'src/app/services/grounds/grounds.service';
import { pagination } from 'src/app/utility/shared/constant/pagination.constant';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-ground-list',
  templateUrl: './ground-list.component.html',
  styleUrls: ['./ground-list.component.css']
})
export class GroundListComponent {

  showLoader: boolean = false;
  groundAllList: any = [];
  page: number = pagination.page;
  pagesize = pagination.itemsPerPage;
  totalRecords: number = pagination.totalRecords;


  constructor(
    private groundService: GroundsService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private authservice: AuthServiceService,
  ) {
  }

  ngOnInit(): void {
    this.getAllGroundLists();
  }

  paginate(page: number) {
    this.page = page;
    this.getAllGroundLists();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getAllGroundLists() {
    this.groundService.getAllGround().subscribe(
      (response) => {
        this.showLoader = false;
        if (response?.status) {
          this.groundAllList = response?.data?.grounds;
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

  deleteGround(id: string) {
    if (confirm('Are you sure you want to delete this ground?')) {
      this.showLoader = true;
      this.groundService.deleteGround(id).subscribe(
        (response) => {
          this.showLoader = false;
          if (response?.status) {
            this.notificationService.showSuccess('Ground deleted successfully');
            this.getAllGroundLists(); // Refresh the list
          } else {
            this.notificationService.showError(response?.message || 'Failed to delete ground');
          }
        },
        (error) => {
          this.showLoader = false;
          this.notificationService.showError(error?.message || 'An error occurred while deleting ground');
        }
      );
    }
  }
}
