import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalStoreExampleComponent } from './signal-store-example.component';

describe('SignalStoreExampleComponent', () => {
  let component: SignalStoreExampleComponent;
  let fixture: ComponentFixture<SignalStoreExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalStoreExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalStoreExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
