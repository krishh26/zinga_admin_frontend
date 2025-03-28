import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';
import { pagination } from 'src/app/utility/shared/constant/pagination.constant';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  showLoader: boolean = false;
  userList: any = [];
  page: number = pagination.page;
  pagesize = pagination.itemsPerPage;
  totalRecords: number = pagination.totalRecords;


  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private authservice: AuthServiceService,
  ) {
  }

  ngOnInit(): void {
    this.getUserLists();
  }

  getUserLists() {
    this.userService.getUserList().subscribe(
      (response) => {
        this.showLoader = false;
        if (response?.status) {
          this.userList = response?.data;
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

  paginate(page: number) {
    this.page = page;
    this.getUserLists();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.showLoader = true;
      this.userService.deleteUser(id).subscribe(
        (response) => {
          this.showLoader = false;
          if (response?.status) {
            this.notificationService.showSuccess('User deleted successfully');
            this.getUserLists(); // Refresh the list
          } else {
            this.notificationService.showError(response?.message || 'Failed to delete user');
          }
        },
        (error) => {
          this.showLoader = false;
          this.notificationService.showError(error?.message || 'An error occurred while deleting user');
        }
      );
    }
  }

}
