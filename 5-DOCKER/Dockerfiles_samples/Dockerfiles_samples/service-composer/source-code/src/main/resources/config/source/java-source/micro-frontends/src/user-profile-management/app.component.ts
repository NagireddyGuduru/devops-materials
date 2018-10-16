import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';

import { UserService } from './user.service.ts';

@Component({
    selector: 'mui-user-profile-mgmt',
    templateUrl: './src/user-profile-management/app.component.html',
    styleUrls: ['./src/user-profile-management/app.component.css']

})
export class AppComponent implements OnInit {
    public users: any;

    constructor(@Inject(UserService) private _userService: UserService) { }

    ngOnInit() {
        let _this = this;
        this._userService.getAllUsers(
            function(usersData) {
                _this.users = usersData;
            }, 
            function(err) {
                console.log(err);
            }
        );
    }
}
