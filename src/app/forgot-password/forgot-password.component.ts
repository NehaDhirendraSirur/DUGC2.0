import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthMainService } from '../auth-main.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {
  constructor(
    private auth: AuthMainService,
    private router: Router,
    private toast: ToastrService
  ) {}

  sendResetData = {
    email: '',
  };

  ngOnInit(): void {}

  sendResetEmail(e: any) {
    console.log(this.sendResetData);

    this.auth.SendResetEmailService(this.sendResetData).subscribe(
      (res) => {
        console.log(res);
        this.toast.success('Email sent successfully');
        this.router.navigate(['/Minor']);
      },
      (err) => {
        console.error('console', err); // Log the entire error object for debugging
        console.log(err.error.message);
        this.toast.error(
          err.error.message || 'An error occurred during login.'
        );
      }
    );
  }
}
