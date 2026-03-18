using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Team
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(100)]
        public string City { get; set; } = string.Empty;

        public int FoundedYear { get; set; }

        // Navegation properties
        public ICollection<Player>? Players { get; set; }
        public ICollection<CoachingStaff>? CoachingStaffs { get; set; }
    }
}
