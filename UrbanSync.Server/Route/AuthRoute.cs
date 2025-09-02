using System.Text.RegularExpressions;

namespace UrbanSync.Server.Route {
    using Controller;
    public static class AuthRoute {

        public static RouteGroupBuilder MapAuthAPi(this RouteGroupBuilder group) {
            group.MapPost("/login" ,AuthController.LoginUser);
            group.MapPost("/register", AuthController.RegisterUser);
            return group;
        }
        
    }
}
