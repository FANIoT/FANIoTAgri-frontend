import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRsComponent } from './map-rs.component';

describe('MapRsComponent', () => {
  let component: MapRsComponent;
  let fixture: ComponentFixture<MapRsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapRsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapRsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
