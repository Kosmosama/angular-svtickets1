import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from './shared/top-menu/top-menu.component';
import { animate, group, query, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, TopMenuComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    animations: [
        trigger('routeAnimation', [
            transition('* => events', [
                query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
                query(':enter', style({ transform: 'translateX(100%)', opacity: 0 }), { optional: true }),
                group([
                    query(':leave', [
                        animate('0.4s ease-in-out', style({ transform: 'translateX(-100%)', opacity: 0 })),
                    ], { optional: true }),
                    query(':enter', [
                        animate('0.6s ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
                    ], { optional: true }),
                ]),
            ]),
            transition('* => eventAdd', [
                query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
                query(':enter', style({ transform: 'scale(0.8)', opacity: 0 }), { optional: true }),
                group([
                    query(':leave', [
                        animate('0.3s ease-in', style({ transform: 'scale(1.2)', opacity: 0 })),
                    ], { optional: true }),
                    query(':enter', [
                        animate('0.5s ease-out', style({ transform: 'scale(1)', opacity: 1 })),
                    ], { optional: true }),
                ]),
            ]),
            transition('* => eventDetail', [
                query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
                query(':enter', style({ transform: 'translateY(20px)', opacity: 0 }), { optional: true }),
                group([
                    query(':leave', [
                        animate('0.3s ease-in', style({ transform: 'translateY(-20px)', opacity: 0 })),
                    ], { optional: true }),
                    query(':enter', [
                        animate('0.5s ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
                    ], { optional: true }),
                ]),
            ]),
            transition('* => eventEdit', [
                query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
                query(':enter', style({ transform: 'rotateY(90deg)', opacity: 0 }), { optional: true }),
                group([
                    query(':leave', [
                        animate('0.4s ease-in', style({ transform: 'rotateY(-90deg)', opacity: 0 })),
                    ], { optional: true }),
                    query(':enter', [
                        animate('0.6s ease-out', style({ transform: 'rotateY(0deg)', opacity: 1 })),
                    ], { optional: true }),
                ]),
            ]),
            transition('* => login', [
                query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
                query(':enter', style({ transform: 'translateY(-100%)', opacity: 0 }), { optional: true }),
                group([
                    query(':leave', [
                        animate('0.3s ease-in', style({ transform: 'translateY(100%)', opacity: 0 })),
                    ], { optional: true }),
                    query(':enter', [
                        animate('0.5s ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
                    ], { optional: true }),
                ]),
            ]),
            transition('* => register', [
                query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
                query(':enter', style({ transform: 'translateX(-100%)', opacity: 0 }), { optional: true }),
                group([
                    query(':leave', [
                        animate('0.4s ease-in', style({ transform: 'translateX(100%)', opacity: 0 })),
                    ], { optional: true }),
                    query(':enter', [
                        animate('0.6s ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
                    ], { optional: true }),
                ]),
            ]),
            transition('* => myProfile', [
                query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
                query(':enter', style({ transform: 'scale(0.8)', opacity: 0 }), { optional: true }),
                group([
                    query(':leave', [
                        animate('0.3s ease-in', style({ transform: 'scale(1.2)', opacity: 0 })),
                    ], { optional: true }),
                    query(':enter', [
                        animate('0.5s ease-out', style({ transform: 'scale(1)', opacity: 1 })),
                    ], { optional: true }),
                ]),
            ]),
            transition('* => userProfile', [
                query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
                query(':enter', style({ transform: 'translateY(100%)', opacity: 0 }), { optional: true }),
                group([
                    query(':leave', [
                        animate('0.3s ease-in', style({ transform: 'translateY(-100%)', opacity: 0 })),
                    ], { optional: true }),
                    query(':enter', [
                        animate('0.5s ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
                    ], { optional: true }),
                ]),
            ]),
        ]),
    ],
})
export class AppComponent {
    getState(routerOutlet: RouterOutlet) {
        return routerOutlet.activatedRouteData['animation'] || 'None';
    }
}
