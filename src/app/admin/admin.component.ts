import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { File } from '../file';
import { DownloadService } from '../download.service';

declare const swal: any;

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css']
})
export class AdminComponent implements OnInit {
  public contribs: any[];
  private password: string;

  constructor(private http: Http, public downloadService: DownloadService) { }

  ngOnInit() {
    swal({
      title: 'Log in.',
      text: 'Please enter your password.',
      content: 'input',
      button: {
        text: 'Log In',
        closeModal: false
      }
    }).then(password => {
      this.http.get('/api/contributions?password=' + password).toPromise().then((resp) => {
        this.password = password;
        this.contribs = JSON.parse(resp.text(), (key, value) => {
          if (key === 'createdAt') {
            return new Date(value);
          }
          return value;
        });
        swal('Logged in', 'You have logged in to the admin page.', 'success');
      }, (err) => {
        swal('Incorrect password', 'Sorry, try again.', 'error');
      });
    });
  }

  requestRemove(contrib) {
    swal({
      title: 'Are you sure?',
      text: 'You won\'t be able to recover this contribution once deleted.',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        this.remove(contrib);
      }
    });
  }

  remove(contrib) {
    this.http.delete(`/api/contributions/${contrib._id}?password=${this.password}`).toPromise().then((resp) => {
      this.contribs.splice(this.contribs.indexOf(contrib), 1);
    }, (err) => {
      swal('Error', 'An unknown error occured.', 'error');
    });
  }
}
