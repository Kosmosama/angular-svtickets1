import { Component, effect, inject, input } from '@angular/core';
import { EventCardComponent } from "../event-card/event-card.component";
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MyEvent } from '../../shared/interfaces/my-event';

@Component({
    selector: 'event-detail',
    standalone: true,
    imports: [EventCardComponent],
    templateUrl: './event-detail.component.html',
    styleUrl: './event-detail.component.css'
})
export class EventDetailComponent {
    private titleService = inject(Title);
    private router = inject(Router);

    event = input.required<MyEvent>();

    constructor() {
        effect(() => {
            if(this.event()) {
                this.titleService.setTitle(this.event()!.title + ' | SVtickets');
            }
        });
    }

    /**
     * Redirects user to initial page.
     */
    goBack() {
        this.router.navigate(['/events']);
    }

//     Like in unit 1 project, this page will show the details of a event (:id).
// Deleting the event from here will redirect to /events.
// Show the map inside a card. The card header will be the event’s address.
// It’s now mandatory to show the list of users attending the event. When the
// user clicks the button and changes his/her attending choice, the list will be
// downloaded again and replaced.
// It’s also mandatory to implement the possibility to comment an event and
// showing the comments in this page. The HTML for the card with the list of
// comments and the comment template is commented in the first project (eventdetail.html). Add this CSS:
// .user-info {
//  width: 8rem;
//  .avatar {
//  width: 4rem;
//  }
// }
// .comment {
//  white-space: pre-wrap;
// }
// Also show a form to create a new comment. This form will only have an
// input for the comment and a button to send it (POST → /events/:id/comments)
// Author: Arturo Bernal Mayordomo IES San Vicente 2024 / 2025 Page: 5
// with this format:
// { comment: "User comment" }
// The form can be something like this:
//  <form class="mt-4">
//  <div class="form-group">
//  <textarea class="form-control" name="comment" placeholder="Write a comment"></textarea>
//  </div>
//  <button type="submit" class="btn btn-primary mt-3">Send</button>
//  </form>
// The server will return the inserted comment (test the service in Postman).
// Add this comment to the list without reloading it.
}
