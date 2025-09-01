using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
namespace UrbanSync.Server.Data {
    
    public class UrbanSyncDb:DbContext {
        public UrbanSyncDb(DbContextOptions<UrbanSyncDb> options) : base(options) {
            
        }
        
    }
}
