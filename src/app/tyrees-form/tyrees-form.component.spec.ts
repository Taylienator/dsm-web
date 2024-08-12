import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyreesFormComponent } from './tyrees-form.component';

describe('TyreesFormComponent', () => {
  let component: TyreesFormComponent;
  let fixture: ComponentFixture<TyreesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TyreesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyreesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
