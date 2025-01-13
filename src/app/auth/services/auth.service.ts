import { HttpClient } from "@angular/common/http";
import { inject, Injectable, Signal, signal, WritableSignal } from "@angular/core";
import { SsrCookieService } from "ngx-cookie-service-ssr";
import { ThirdPartyLogin, User, UserLogin } from "../../shared/interfaces/user";
import { map, Observable } from "rxjs";
import { TokenResponse } from "../../shared/interfaces/responses";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private http = inject(HttpClient);
    cookieService = inject(SsrCookieService);

    // Auth service → This service will manage all operations related to login/register.

    // AuthService This service will perform the login (storing the →
    //     authentication token) and logout (removing the token) actions, and will
    //     contain the following attributes and methods:

    //     ◦ #logged: WritableSignal<boolean> By default false. Will indicate if →
    //     the user is logged in or not. Create a getter that returns this signal in
    //     read-only mode.
    #logged: WritableSignal<boolean> = signal(false);

    get logged(): Signal<boolean> {
        return this.#logged.asReadonly();
    }

    //     ◦ login(data: UserLogin): Observable<void> Will check the login →
    //     against the server. If login goes ok, in the map function, save the
    //     token in the Local Storage and set logged to true.
    //     ◦ Other methods Implement other methods for user registration, →
    //     login with Google (send credentials with lat and lng) and Facebook
    //     (send accessToken with lat and lng). If you think you need to
    //     implement anything else, do it.
    login(payload: UserLogin | ThirdPartyLogin): Observable<void> {
        const endpoint = this.isThirdPartyLogin(payload) ? "auth/google" : "auth/login";
        return this.http
            .post<TokenResponse>(endpoint, payload)
            .pipe(
                map((resp: TokenResponse) => {
                    this.#logged.set(true);
                    this.cookieService.set("token", resp.accessToken);
                })
            );
    }

    // Type Guard to Check if Payload is ThirdPartyLogin
    private isThirdPartyLogin(payload: UserLogin | ThirdPartyLogin): payload is ThirdPartyLogin {
        return (payload as ThirdPartyLogin).token !== undefined;
    }

    //     ◦ Logout(): void This method will remove the token from the → Local
    //     Storage, set this.logged to false.
    logout(): void {
        this.cookieService.delete("token");
        this.#logged.set(false);
    }

    //     ◦ isLogged(): Observable<boolean>.
    //     ▪ If the this.logged property is false and there’s no token in Local
    //     Storage, return Observable<false> → of(false). Import the of
    //     function from "rxjs", it returns an observable with that value.
    //     ▪ If the this.logged property is true, return Observable<true> →
    //     of(true)
    //     ▪ But if it’s false and there’s a token, return the call to the
    //     auth/validate service (Observable). Inside the pipe method:
    //     • If there"s no error (map function), change this.#logged to true
    //     and return true
    //     • If there"s an error (catchError function), remove the token from
    //     local storage (not valid), and return of(false). The catchError
    //     function must return the value inside an observable.

    register(user: User): Observable<void> {
        return this.http.post<void>("auth/register", user);
    }
}
