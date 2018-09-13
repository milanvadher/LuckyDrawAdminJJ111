import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sortName = null;
  sortValue = null;
  listOfSearchName = [];
  searchAddress: string;
  data;
  displayData: any[];
  isVisibleMiddle = false;
  userDetail: any;

  constructor(public api: RestApiService, private modalService: NzModalService, private notification: NzMessageService) {
    this.getAllUsers();
  }

  ngOnInit() {
  }

  getAllUsers() {
    this.api.postequest('userList', { contactNumber: '7574852413' }).subscribe(data => {
      console.log('userList', data);
      this.data = data;
      this.displayData = [...this.data];
    });
  }

  viewUser(user) {
    this.isVisibleMiddle = true;
    this.userDetail = user;
  }

  handleOkUser() {
    this.isVisibleMiddle = false;
  }

  deleteUser(userNo) {
    this.modalService.confirm({
      nzTitle: '<i>Do you Want to delete these user?</i>',
      nzContent: '<b>After that you can\'t revert back.</b>',
      nzOnOk: () => {
        this.api.postequest('deleteUser', { contactNumber: '7574852413', deleteUserContact: userNo }).subscribe(data => {
          console.log('deleteUser', data);
          this.notification.success(data['msg']);
          this.getAllUsers();
        });
      }
    });
  }

  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search(): void {
    /** filter data **/
    const filterFunc = item => (this.searchAddress ? item.address.indexOf(this.searchAddress) !== -1 : true) && (this.listOfSearchName.length ? this.listOfSearchName.some(name => item.name.indexOf(name) !== -1) : true);
    const data = this.data.filter(item => filterFunc(item));
    /** sort data **/
    if (this.sortName && this.sortValue) {
      this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
    } else {
      this.displayData = data;
    }
  }

}
