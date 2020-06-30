import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DownloadService } from '../download.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css']
})
export class AdminComponent implements OnInit {
  public contribs: any[];
  private password: string;

  constructor(private http: HttpClient, public downloadService: DownloadService) { }

  ngOnInit() {
    this.login();
  }

  async login() {
    const { value: password } = await Swal.fire<string>({
      title: 'Admin Login',
      input: 'password',
      inputPlaceholder: 'Enter your password',
      inputAttributes: {
        'autocapitalize': 'off',
        'autocorrect': 'off'
      }
    });
    this.http.get('/api/contributions?password=' + password, { responseType: 'text' })
      .toPromise()
      .then(resp => {
        this.password = password;
        this.contribs = JSON.parse(resp, (key, value) => {
          if (key === 'createdAt') {
            return new Date(value);
          }
          return value;
        });
        Swal.fire('Logged in', 'You have logged in to the admin page.', 'success');
      }, err => {
        Swal.fire('Incorrect password', 'Sorry, try again.', 'error');
      });
  }

  requestRemove(contrib) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to recover this contribution once deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.remove(contrib);
      }
    });
  }

  remove(contrib) {
    this.http.delete(
      `/api/contributions/${contrib._id}?password=${this.password}`,
      { responseType: 'text' }
    ).toPromise().then((resp) => {
      this.contribs.splice(this.contribs.indexOf(contrib), 1);
    }, (err) => {
      Swal.fire('Error', 'An unknown error occured.', 'error');
    });
  }
}
