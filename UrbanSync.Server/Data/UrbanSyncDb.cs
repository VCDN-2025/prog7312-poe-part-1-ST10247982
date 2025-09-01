using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using UrbanSync.Server.Models;
namespace UrbanSync.Server.Data {
    
    public class UrbanSyncDb:DbContext {
        public UrbanSyncDb(DbContextOptions<UrbanSyncDb> options) : base(options) {
            
        }
        public DbSet<User> Users { get; set; }
        public DbSet<ReportedIssue> ReportedIssues { get; set; }
    }
}
