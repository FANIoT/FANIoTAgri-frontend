import { Component, OnInit } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public viewDate: Date = new Date();
  public view: CalendarView = CalendarView.Month;

  constructor() { }

  ngOnInit() {
  }

}
