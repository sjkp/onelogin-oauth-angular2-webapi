using System;
using System.Configuration;
using System.IdentityModel.Tokens;
using System.Linq;
using Microsoft.Owin;
using Microsoft.Owin.Security.Jwt;
using Owin;
using System.Security.Cryptography.X509Certificates;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Hosting;
using Auth0.Owin;
using IdentityServer3.AccessTokenValidation;
using Microsoft.IdentityModel.Protocols;
using AuthenticationMode = Microsoft.Owin.Security.AuthenticationMode;

[assembly: OwinStartup(typeof(WebApi.Startup))]

namespace WebApi
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var domain = "https://dg-dev.onelogin.com/"; // $"https://{ConfigurationManager.AppSettings["Auth0Domain"]}/";
            //var apiIdentifier = ConfigurationManager.AppSettings["Auth0ApiIdentifier"];

            var keyResolver = new OpenIdConnectSigningKeyResolver("https://dg-dev.onelogin.com/oidc/");

            app.UseJwtBearerAuthentication(
                new JwtBearerAuthenticationOptions
                {
                    AuthenticationMode = AuthenticationMode.Active,
                    TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidAudience = "2344ea80-496e-0135-23fd-0aa838f6b6c8106959",
                        ValidIssuer = "https://openid-connect.onelogin.com/oidc",
                        IssuerSigningKeyResolver = (token, securityToken, identifier, parameters) => keyResolver.GetSigningKey(identifier)
                    }
                });

            // Configure Web API
            WebApiConfig.Configure(app);
        }
    }   
}
