using System.Text.RegularExpressions;

namespace UrbanSync.Server.Route {
    using Controller;
    public static class AuthRoute {

        public static RouteGroupBuilder MapAuthAPi(this RouteGroupBuilder group) {
            group.MapGet("/" ,AuthController.LoginUser);
            group.MapPost("/", AuthController.RegisterUser);
            return group;
        }
        
    }
}
