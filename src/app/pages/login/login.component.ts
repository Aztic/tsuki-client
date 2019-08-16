import { Component, OnInit } from '@angular/core';
declare var particlesJS: any;
import {MatSnackBar} from '@angular/material/snack-bar';
import { SpinnerOverlayService } from 'src/app/services/spinner-overlay.service';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = '';
  email = '';
  password = '';
  selectedField = 'login';
  private error: string = null;

  constructor(
    // tslint:disable-next-line: variable-name
    private snackBar: MatSnackBar,
    private router: Router,
    public overlayService: SpinnerOverlayService,
    public userService: UserService,
    public route: ActivatedRoute
    ) {

    // See if there's any error
    this.route.queryParams.subscribe(params => {
      this.error = params.error;
      if (this.error) {
        this.snackBar.open(this.error, 'close', {
          duration: 2000,
          panelClass: ['black-snackbar']
        });
      }
    });

    }

  ngOnInit() {
    particlesJS.load('particles-js', 'assets/particles.json', null);
  }

  doLogin() {
    // Loading screen
    this.overlayService.show();
    this.userService.login(this.username, this.password).then((res) => {
      this.overlayService.hide().then( () => { this.router.navigate(['/home']); });
    })
    .catch((err) => {
      this.overlayService.hide().then(() => {
        this.snackBar.open('Login failed', 'close', {
          duration: 2000,
          panelClass: ['black-snackbar']
        });
      });
    });

  }

  doRegister() {
    // Loading screen
    this.overlayService.show();
    this.userService.register(this.username, this.email, this.password).then((res) => {
      this.overlayService.hide().then( () => { this.router.navigate(['/home']); });
    })
    .catch((err) => {
      this.overlayService.hide().then(() => {
        this.snackBar.open('Register failed', 'close', {
          duration: 2000,
          panelClass: ['black-snackbar']
        });
      });
    });
  }

  handleClick() {
    if (this.selectedField === 'login') {
      this.doLogin();
    } else {
      this.doRegister();
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  processChange() {
    if (this.selectedField === 'register') {
      this.overlayService.show();
      this.userService.checkRegister().then((res) => {
        if (!res) {
          this.snackBar.open('Register is currently disabled', 'close', {
            duration: 4000,
            panelClass: ['black-snackbar']
          });
          this.selectedField = 'login';
        }
        this.overlayService.hide();
      })
      .catch((err) => {
        this.overlayService.hide().then(() => {
          this.snackBar.open('Error retrieving register status', 'close', {
            duration: 2000,
            panelClass: ['black-snackbar']
          });
        });
      });
    }
  }

}
