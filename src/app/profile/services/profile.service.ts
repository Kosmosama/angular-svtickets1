import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User, UserPasswordEdit, UserPhotoEdit, UserProfileEdit } from '../../shared/interfaces/user';
import { map, Observable } from 'rxjs';
import { UserResponse } from '../../shared/interfaces/responses';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    http = inject(HttpClient);

    /**
     * Retrieves a user by their ID or the currently authenticated user if no ID is provided.
     *
     * @param {number} [id] - The optional ID of the user to retrieve. If not provided, retrieves the currently authenticated user.
     * 
     * @returns {Observable<User>} An Observable that emits the retrieved User object.
     */
    getUser(id?: number): Observable<User> {
        return this.http
            .get<UserResponse>(id ? `users/${id}` : "users/me")
            .pipe(map((resp: UserResponse) => resp.user));
    }
    
    /**
     * Updates the profile of the currently authenticated user.
     *
     * @param {UserProfileEdit} data - The data to update the user's profile with.
     * 
     * @returns {Observable<UserProfileEdit>} An Observable that emits the updated UserProfileEdit object.
     */
    updateProfile(data: UserProfileEdit): Observable<UserProfileEdit> {
        return this.http.put<UserProfileEdit>("users/me", data);
    }

    /**
     * Updates the profile photo of the currently authenticated user.
     *
     * @param {UserPhotoEdit} data - The data to update the user's profile photo with.
     * 
     * @returns {Observable<UserPhotoEdit>} An Observable that emits the updated UserPhotoEdit object.
     */
    updatePhoto(data: UserPhotoEdit): Observable<UserPhotoEdit> {
        return this.http.put<UserPhotoEdit>("users/me/photo", data);
    }

    /**
     * Updates the password of the currently authenticated user.
     *
     * @param {UserPasswordEdit} data - The data to update the user's password with.
     * 
     * @returns {Observable<UserPasswordEdit>} An Observable that emits the updated UserPasswordEdit object.
     */
    updatePassword(data: UserPasswordEdit): Observable<UserPasswordEdit> {
        return this.http.put<UserPasswordEdit>("users/me/password", data);
    }
}