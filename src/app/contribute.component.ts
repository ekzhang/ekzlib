import { Component, OnInit } from '@angular/core';
import { File } from './file';
import { Http } from '@angular/http';

@Component({
  selector: 'app-contribute',
  templateUrl: 'contribute.component.html'
})

export class ContributeComponent implements OnInit {
  public file: File;
  public sender: string;

  constructor(private http: Http) {
    this.file = {
      title: undefined,
      name: undefined,
      contents: undefined
    };
  }

  ngOnInit() { }

  submit() {
    if (!this.file.title || !this.file.name || !this.file.contents || !this.sender) {
      alert('Error: Required input field not met');
      return;
    }
    this.http.post('/api/contributions', {
      sender: this.sender, file: this.file
    }).toPromise().then((resp) => {
      alert('Success! Your contribution has been sent.');
    }, (err) => {
      alert('An error occured.');
    });
  }
}
