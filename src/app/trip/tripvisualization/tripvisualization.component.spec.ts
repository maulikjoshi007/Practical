import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripvisualizationComponent } from './tripvisualization.component';

describe('TripvisualizationComponent', () => {
  let component: TripvisualizationComponent;
  let fixture: ComponentFixture<TripvisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripvisualizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripvisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
