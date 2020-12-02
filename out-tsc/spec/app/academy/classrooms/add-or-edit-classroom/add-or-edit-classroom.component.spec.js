import { async, TestBed } from '@angular/core/testing';
import { AddOrEditClassroomComponent } from './add-or-edit-classroom.component';
describe('AddOrEditClassroomComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddOrEditClassroomComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AddOrEditClassroomComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=add-or-edit-classroom.component.spec.js.map