import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocialPage } from './social.page';

describe('SocialPage', () => {
  let component: SocialPage;
  let fixture: ComponentFixture<SocialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
