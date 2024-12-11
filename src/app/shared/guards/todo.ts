// Create 2 guards for controlling authenticated routes:
// • LoginActivateGuard Use it in every route except for → auth routes. Will
// return the call to AuthService.isLogged(). In the map function:
// ◦ if the user is not logged (false), return a redirection (urlTree) to
// ‘/auth/login’ page.
// ◦ If the user is logged (true), return true. You can go to the route.
// • LogoutActivateGuard Use it only for the → auth/ routes. Will return the
// call to AuthService.isLogged(). In the map function:
// ◦ if the user is logged (true), return a redirection (urlTree) to ‘/posts’.
// ◦ If the user is not logged (false), return true. You can go to the route.
// Also, use the leavePageGuard with 'posts/add', 'posts/edit/:id' and
// '/auth/register' routes. Only ask the user if the he/she has changed something
// in the form (dirty), or if the data has not been saved yet. Use ngBootstrap
// modal to ask the user.