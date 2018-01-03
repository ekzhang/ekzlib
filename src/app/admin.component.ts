import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { File } from './file';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css']
})

export class AdminComponent implements OnInit {
  public contribs;

  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get('/api/contributions').toPromise().then((resp) => {
      this.contribs = JSON.parse(resp.text());
    }, (err) => {
      console.error(err);
    });
  }

  download(file: File) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(file.contents));
    element.setAttribute('download', file.name);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  remove(contrib) {
    this.http.delete('api/contributions/' + contrib._id).toPromise().then((resp) => {
      this.contribs.splice(this.contribs.indexOf(contrib), 1);
    }, (err) => {
      alert('An unknown error occured.');
    });
  }
}
