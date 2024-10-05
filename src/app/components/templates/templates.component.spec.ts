import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesComponent } from './templates.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../../services/data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TemplatesComponent', () => {
  let component: TemplatesComponent;
  let fixture: ComponentFixture<TemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplatesComponent, BrowserAnimationsModule, HttpClientModule],
      providers: [DataService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
