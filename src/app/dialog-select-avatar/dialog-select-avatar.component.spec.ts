import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSelectAvatarComponent } from './dialog-select-avatar.component';

describe('DialogSelectAvatarComponent', () => {
  let component: DialogSelectAvatarComponent;
  let fixture: ComponentFixture<DialogSelectAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSelectAvatarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogSelectAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
