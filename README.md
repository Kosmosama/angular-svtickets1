# AngularSvtickets

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## TODO

### /EVENTS
- Show confirm dialog to delete (ngBootstrap or ngx-sweetalert2).
- Filtering and ordering events
    - Search input stored in a signal, use toSignal to update value & debounceTime(600ms) [Reference](https://fullstackpro.es/courses/curso-angular/reactive-forms#busqueda-con-retardo-debounce)
    - Order value will also be a signal
    - Use effect function and create dependencies reading the values of the 3 signals above. Call corresponding service to load events based on these params.
    - In both approaches, if page = 1, replace events with result; Otherwise, concatenate.
- Use input for "creator" and "attending" (can be null).
    - Include both in effect function and call corresponding method.
    - Add something like this: "Events created by Pepito. Filtered by party. Ordered by price." (Call service that gets user info to get username)

### /EVENTS/{id}
- Show map.
- List of users attending. Replaced and reshown when user clicks attend.
- Show comments. (html in event-detail.html)
    - .user-info { width: 8rem; .avatar { width: 4rem; } }
    - .comment { white-space: pre-wrap; }
- Show form to create comment. (Only input for comment and button to send it {POST → /events/:id/comments | format: { comment: "User comment" } | returns comment})
    ```html
    <form class="mt-4">
        <div class="form-group">
            <textarea class="form-control" name="comment" placeholder="Write a comment"></textarea>
        </div>
        <button type="submit" class="btn btn-primary mt-3">Send</button>
    </form>
    ```

### /EVENTS/ADD
- Fix.
- Shouldn't be able to send it until it is valid.
- Input for address. (The map thing)

### /EVENTS/{id}/EDIT
- Reuse form to add an event. (ex: if no id is received, add; Otherwise, show info in inputs)
    - Change submit button text.

### /PROFILE/ME | /PROFILE/{id}
- Show user profile info. (Map + marker too)
- No id = Show current logged user; Otherwise, show id user.
- Show edit profile, image and password only if user is me.
- Add the following buttons:
    - "Events user has created" --> redirect to /events?creator={id}
    - "Events user is attending" --> redirect to /events?attending={id}
    - Send params like this:
        ```html
        <a [routerLink]="['/events']" [queryParams]="{ creator: user.id }">Created events</a>
        ```

### RESOLVERS
- Get basic data from [event detail], [event edit] and [profile] with resolvers before showing the page.