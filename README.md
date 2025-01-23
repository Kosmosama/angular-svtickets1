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

### /EVENTS/{id}
- Show map.
- List of users attending. Replaced and reshown when user clicks attend.
- Show comments. (html in event-detail.html)
    - .user-info { width: 8rem; .avatar { width: 4rem; } }
    - .comment { white-space: pre-wrap; }
- Show form to create comment with rxResource. (Only input for comment and button to send it {POST → /events/:id/comments | format: { comment: "User comment" } | returns comment})
    ```html
    <form class="mt-4">
        <div class="form-group">
            <textarea class="form-control" name="comment" placeholder="Write a comment"></textarea>
        </div>
        <button type="submit" class="btn btn-primary mt-3">Send</button>
    </form>
    ```

### /EVENTS/{id}/EDIT
- Reuse form to add an event. (ex: if no id is received, add; Otherwise, show info in inputs)
    - Change submit button text.
