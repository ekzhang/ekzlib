import { Component, OnInit } from '@angular/core';
import { File } from '../file';
import { HttpClient } from '@angular/common/http';

import swal from 'sweetalert2';

@Component({
  selector: 'app-contribute',
  templateUrl: 'contribute.component.html'
})
export class ContributeComponent implements OnInit {
  public file: File;
  public sender: string;

  constructor(private http: HttpClient) {
    this.file = {
      title: undefined,
      name: undefined,
      contents: undefined,
      repo: null
    };
  }

  ngOnInit() { }

  submit() {
    if (!this.file.title || !this.file.name || !this.file.contents || !this.sender) {
      swal('Missing input field', 'You need to fill out all parts of the form before submitting.', 'info');
      return;
    }
    this.http.post('/api/contributions', {
      sender: this.sender, file: this.file
    }).toPromise().then((resp) => {
      swal('Thanks!', 'Your contribution has been sent.', 'success');
    }, (err) => {
      swal('An error occured.', 'Please contact ekzhang1@gmail.com with any relevant information.', 'error');
    });
  }
}
