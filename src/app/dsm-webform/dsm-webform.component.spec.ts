import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsmWebformComponent } from './dsm-webform.component';

describe('DsmWebformComponent', () => {
  let component: DsmWebformComponent;
  let fixture: ComponentFixture<DsmWebformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsmWebformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsmWebformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
