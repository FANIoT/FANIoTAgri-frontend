import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-qoute',
  templateUrl: './qoute.component.html',
  styleUrls: ['./qoute.component.less']
})
export class QouteComponent implements OnInit {

  @HostBinding('attr.class') elementClasses = 'content bg-black-darker has-bg';

  constructor() { }

  ngOnInit() {
  }

}
