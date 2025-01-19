import { CanDeactivateFn } from '@angular/router';
import { CanComponentDeactivate } from '../interfaces/can-component-deactivate';

export const leavePageGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
    return component.canDeactivate? component.canDeactivate() : true;
};

// Also, use the leavePageGuard with 'posts/add', 'posts/edit/:id' and
// '/auth/register' routes. Only ask the user if the he/she has changed something
// in the form (dirty), or if the data has not been saved yet. Use ngBootstrap
// modal to ask the user.
// (I think it is done)