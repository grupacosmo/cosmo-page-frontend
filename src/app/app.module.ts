import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {SocialLoginModule} from "@abacritt/angularx-social-login";
import {AccountService} from "./core/services/account/account.service";
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        SocialLoginModule,
        HttpClientModule,
        BrowserAnimationsModule
    ],
    providers: [
        { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService] },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

function appInitializer(accountService: AccountService) {
    return () => new Promise(resolve => {
        // @ts-ignore
        window['fbAsyncInit'] = function () {
            FB.init({
                appId: "3196012707374203",
                cookie: true,
                xfbml: true,
                version: 'v2.7'
            });
            -
                FB.getLoginStatus(({authResponse}) => {
                    if (authResponse) {
                        // @ts-ignore
                        accountService.apiAuthenticate(authResponse.accessToken)
                            .subscribe()
                            .add(resolve as any);
                    } else {
                        // @ts-ignore
                        resolve();
                    }
                });
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            // @ts-ignore
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            // @ts-ignore
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    });
}
