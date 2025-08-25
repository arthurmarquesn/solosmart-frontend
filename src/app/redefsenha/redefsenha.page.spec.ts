import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RedefsenhaPage } from './redefsenha.page';

describe('RedefsenhaPage', () => {
  let component: RedefsenhaPage;
  let fixture: ComponentFixture<RedefsenhaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RedefsenhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
