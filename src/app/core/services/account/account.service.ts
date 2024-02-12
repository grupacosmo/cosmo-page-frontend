import { Injectable } from '@angular/core';
import {BehaviorSubject, concatMap, EMPTY, from, map, Observable, of} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

interface Account {}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountSubject: BehaviorSubject<Account>;
  public account: Observable<Account>;

  constructor(
      private router: Router,
      private route: ActivatedRoute
  ) {
    this.accountSubject = new BehaviorSubject<any>({});
    this.account = this.accountSubject.asObservable();
  }

  public get accountValue(): any {
    return this.accountSubject.value;
  }

  login() {
    this.facebookLogin()
        .pipe(concatMap(accessToken => this.apiAuthenticate(accessToken)))
        .subscribe(() => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        });
  }

  facebookLogin() {
    return from(new Promise<fb.StatusResponse>(resolve => FB.login(resolve)))
        .pipe(concatMap(({ authResponse }) => {
          if (!authResponse) return EMPTY;
          console.log(authResponse)
          return of(authResponse.accessToken);
        }));
  }

  apiAuthenticate(accessToken: string | undefined) {
    return of(accessToken)
  }

  logout() {
    // @ts-ignore
    FB.api('/me/permissions', 'delete', null, () => FB.logout());
    this.stopAuthenticateTimer();
    this.accountSubject.next({});
    this.router.navigate(['/login']);
  }

  private authenticateTimeout: any;

  private startAuthenticateTimer() {
    const jwtToken = JSON.parse(atob(this.accountValue.token.split('.')[1]));

    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    const { accessToken }: any = FB.getAuthResponse();
    this.authenticateTimeout = setTimeout(() => {
      this.apiAuthenticate(accessToken).subscribe();
    }, timeout);
  }

  private stopAuthenticateTimer() {
    clearTimeout(this.authenticateTimeout);
  }
}
