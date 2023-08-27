import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCompComponent } from './home-comp.component';

describe('HomeCompComponent', () => {
  let component: HomeCompComponent;
  let fixture: ComponentFixture<HomeCompComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeCompComponent]
    });
    fixture = TestBed.createComponent(HomeCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
