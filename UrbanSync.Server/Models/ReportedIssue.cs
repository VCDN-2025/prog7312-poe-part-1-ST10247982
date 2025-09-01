using System.Buffers.Text;

namespace UrbanSync.Server.Models {
    public class ReportedIssue {
        public Guid Id { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public IFormFile Image { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}
