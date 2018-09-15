import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawsComponent } from './draws.component';

describe('DrawsComponent', () => {
  let component: DrawsComponent;
  let fixture: ComponentFixture<DrawsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
