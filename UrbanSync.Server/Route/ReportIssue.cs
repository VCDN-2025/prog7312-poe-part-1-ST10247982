using Microsoft.AspNetCore.Authorization;
using System.Net;
using System.Runtime.CompilerServices;
using UrbanSync.Server.Controller;

namespace UrbanSync.Server.Route {
    public static class  ReportIssue {

        public static RouteGroupBuilder MapReportIssueApi(this RouteGroupBuilder group) {
            group.MapPost("/", ReportIssueController.Create);
            return group;
        }
    }
}
