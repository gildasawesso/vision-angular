import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import ChartDataLabels from 'chartjs-plugin-datalabels';
let EffectifPerClassroomComponent = class EffectifPerClassroomComponent {
    constructor(classroomsRepository, registrationsRepository, repo, change, services) {
        this.classroomsRepository = classroomsRepository;
        this.registrationsRepository = registrationsRepository;
        this.repo = repo;
        this.change = change;
        this.services = services;
        this.chartDataLabels = ChartDataLabels;
        this.barChartOptions = {
            responsive: true,
            aspectRatio: 3.2,
            plugins: {
                datalabels: {
                    color: '#ffffff',
                    padding: 2
                }
            },
            scales: {
                xAxes: [
                    {
                        gridLines: { display: false },
                    }
                ],
                yAxes: [
                    {
                        gridLines: { drawOnChartArea: false }
                    }
                ]
            }
        };
        this.barChartData = [
            {
                data: [],
                label: 'Effectif par classe',
                backgroundColor: 'rgb(54,181,183)',
                barPercentage: 1,
                borderCapStyle: 'round',
                hoverBackgroundColor: '#90e3e5'
            },
        ];
    }
    ngOnInit() {
        this.labels = this.classroomsRepository.stream.pipe(map(classrooms => classrooms.map(c => c.name)));
    }
    ngAfterViewInit() {
        this.services.statsStudent.effectifByClassroom.subscribe(data => {
            this.barChartData[0].data = data;
            this.change.detectChanges();
        });
    }
};
EffectifPerClassroomComponent = __decorate([
    Component({
        selector: 'app-effectif-per-classroom',
        templateUrl: './effectif-per-classroom.component.html',
        styleUrls: ['./effectif-per-classroom.component.scss']
    })
], EffectifPerClassroomComponent);
export { EffectifPerClassroomComponent };
//# sourceMappingURL=effectif-per-classroom.component.js.map