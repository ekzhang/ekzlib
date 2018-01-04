import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { File } from './file';
import { DownloadService } from './download.service';

declare const swal: any;

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css']
})
export class AdminComponent implements OnInit {
  public contribs;

  constructor(private http: Http, public downloadService: DownloadService) { }

  ngOnInit() {
    this.http.get('/api/contributions').toPromise().then((resp) => {
      this.contribs = JSON.parse(resp.text());
    }, (err) => {
      console.error(err);
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
    this.http.delete('/api/contributions/' + contrib._id).toPromise().then((resp) => {
      this.contribs.splice(this.contribs.indexOf(contrib), 1);
    }, (err) => {
      alert('An unknown error occured.');
    });
  }
}
