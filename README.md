# OneloginOauth

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.1.

The folder WebAPI contains a backend that shows how to create an API that only can be called by users that can present a JWT token from the OneLogin IdP. 

To test the app with onelogin a public url must be used. Ngrok.io can be used to setup a tunnel to localhost. 

When doing so be sure to run `ng serve --public d06c716a.ngrok.io`

To proxy to backend service hosted in IISExpress user `ng serve --public d06c716a.ngrok.io --proxy-config proxy.conf.json` ensure that the IISExpress site answers on the host name. 

``` xml
 <site name="WebApi" id="2">
    <application path="/" applicationPool="Clr4IntegratedAppPool">
        <virtualDirectory path="/" physicalPath="J:\Projects\onelogin-oauth\WebApi\WebApi" />
    </application>
    <bindings>
        <binding protocol="http" bindingInformation="*:58105:localhost" />
        <binding protocol="http" bindingInformation="*:58105:d06c716a.ngrok.io" /> <!-- this is the important line -->
    </bindings>
</site>
```


### Links
* How to setup OneLogin for OpenIdConnect https://developers.onelogin.com/openid-connect/connect-to-onelogin 
* OneLogin openid connect configuration (replace dg-dev with your domain) https://dg-dev.onelogin.com/oidc/.well-known/openid-configuration
* Angular2 Library used for OpenIDConnect/OAuth2: https://github.com/manfredsteyer/angular-oauth2-oidc
* Backend is the sample from Auth0 https://auth0.com/docs/quickstart/backend/webapi-owin

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
