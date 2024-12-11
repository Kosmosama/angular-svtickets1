// Auth service → This service will manage all operations related to login /
// register.

// AuthService This service will perform the login (storing the →
//     authentication token) and logout (removing the token) actions, and will
//     contain the following attributes and methods:
//     ◦ #logged: WritableSignal<boolean> By default false. Will indicate if →
//     the user is logged in or not. Create a getter that returns this signal in
//     read-only mode.
//     ◦ login(data: UserLogin): Observable<void> Will check the login →
//     against the server. If login goes ok, in the map function, save the
//     token in the Local Storage and set logged to true.
//     ◦ Logout(): void This method will remove the token from the → Local
//     Storage, set this.logged to false.
//     ◦ isLogged(): Observable<boolean>.
//     ▪ If the this.logged property is false and there’s no token in Local
//     Storage, return Observable<false> → of(false). Import the of
//     function from 'rxjs', it returns an observable with that value.
//     ▪ If the this.logged property is true, return Observable<true> →
//     of(true)
//     ▪ But if it’s false and there’s a token, return the call to the
//     auth/validate service (Observable). Inside the pipe method:
//     • If there's no error (map function), change this.#logged to true
//     and return true
//     • If there's an error (catchError function), remove the token from
//     local storage (not valid), and return of(false). The catchError
//     function must return the value inside an observable.
//     ◦ Other methods Implement other methods for user registration, →
//     login with Google (send credentials with lat and lng) and Facebook
//     (send accessToken with lat and lng). If you think you need to
//     implement anything else, do it.
