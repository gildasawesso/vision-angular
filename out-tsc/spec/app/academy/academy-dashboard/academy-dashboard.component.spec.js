import { LayoutModule } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AcademyDashboardComponent } from './academy-dashboard.component';
describe('AcademyDashboardComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AcademyDashboardComponent],
            imports: [
                NoopAnimationsModule,
                LayoutModule,
                MatButtonModule,
                MatCardModule,
                MatGridListModule,
                MatIconModule,
                MatMenuModule,
            ]
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AcademyDashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should compile', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=academy-dashboard.component.spec.js.map