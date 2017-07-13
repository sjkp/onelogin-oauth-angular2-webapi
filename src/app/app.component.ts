import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
   constructor(private oauthService: OAuthService) {

      // URL of the SPA to redirect the user to after login
        this.oauthService.redirectUri = window.location.origin.endsWith('/') ?  window.location.origin :  window.location.origin + '/' ;
        //https://dg-dev.onelogin.com/oidc/auth?client_id=2344ea80-496e-0135-23fd-0aa838f6b6c8106959&nonce=6755dc87d3af4520e62a7053b1dd0e84&redirect_uri=https%3A%2F%2Fd06c716a.ngrok.io%2F&response_type=id_token&scope=openid&state=564744c48757a46aa8650994b1b4a7be
        // The SPA's id. The SPA is registerd with this id at the auth-server
        this.oauthService.clientId = "2344ea80-496e-0135-23fd-0aa838f6b6c8106959";

        // set the scope for the permissions the client should request
        // The first three are defined by OIDC. 
        this.oauthService.scope = "openid profile email";

        // set to true, to receive also an id_token via OpenId Connect (OIDC) in addition to the
        // OAuth2-based access_token
        this.oauthService.oidc = true;

        // Use setStorage to use sessionStorage or another implementation of the TS-type Storage
        // instead of localStorage
        this.oauthService.setStorage(sessionStorage);

        // The name of the auth-server that has to be mentioned within the token
        this.oauthService.issuer = "https://dg-dev.onelogin.com/oidc";
        
        // Load Discovery Document and then try to login the user
        this.oauthService.loadDiscoveryDocument().then(() => {

            // This method just tries to parse the token(s) within the url when
            // the auth-server redirects the user back to the web-app
            // It dosn't send the user the the login page
            this.oauthService.tryLogin({});      

        });
    }

   public login() {
        this.oauthService.initImplicitFlow();
    }
    
    public logoff() {
        this.oauthService.logOut();
    }

    public accessToken() {
      console.log(this.oauthService.getAccessToken());
      console.log(this.oauthService.getIdToken());
    }
    
    public get name() {
        let claims = this.oauthService.getIdentityClaims();
        if (!claims) return null;
        return claims.given_name; 
    }
}
