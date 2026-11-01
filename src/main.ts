import { AppComponent } from "./app/app.component";
import { provideAnimations } from "@angular/platform-browser/animations";
import {
  withInterceptorsFromDi,
  provideHttpClient,
} from "@angular/common/http";
import { bootstrapApplication } from "@angular/platform-browser";
import { MAT_DIALOG_DEFAULT_OPTIONS } from "@angular/material/dialog";
import { AccountService } from "./app/core/services/account/account.service";
import { inject, provideAppInitializer } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routeConfig } from "./routes";

function appInitializer(accountService: AccountService) {
  return () =>
    new Promise<void>((resolve) => {
      let resolved = false;
      const resolveOnce = () => {
        if (resolved) return;
        resolved = true;
        resolve();
      };

      // @ts-ignore
      window["fbAsyncInit"] = function () {
        FB.init({
          appId: "3196012707374203",
          cookie: true,
          xfbml: true,
          version: "v2.7",
        });

        FB.getLoginStatus(({ authResponse }) => {
          if (authResponse) {
            // @ts-ignore
            accountService
              .apiAuthenticate(authResponse.accessToken)
              .subscribe()
              .add(resolveOnce);
          } else {
            resolveOnce();
          }
        });
      };

      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        // @ts-ignore
        js.onerror = resolveOnce;
        // @ts-ignore
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        // @ts-ignore
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");

      setTimeout(resolveOnce, 3000);
    });
}

bootstrapApplication(AppComponent, {
  providers: [
    provideAppInitializer(() => {
      const initializerFn = appInitializer(inject(AccountService));
      return initializerFn();
    }),
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    provideRouter(routeConfig),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
  ],
}).catch((err) => console.error(err));
