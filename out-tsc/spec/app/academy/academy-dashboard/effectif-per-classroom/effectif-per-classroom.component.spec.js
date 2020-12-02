import { async, TestBed } from '@angular/core/testing';
import { EffectifPerClassroomComponent } from './effectif-per-classroom.component';
describe('EffectifPerClassroomComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EffectifPerClassroomComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(EffectifPerClassroomComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=effectif-per-classroom.component.spec.js.map