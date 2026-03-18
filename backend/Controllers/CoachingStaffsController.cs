using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoachingStaffsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CoachingStaffsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CoachingStaff>>> GetCoachingStaffs()
        {
            return await _context.CoachingStaffs.Include(c => c.Team).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CoachingStaff>> GetCoachingStaff(int id)
        {
            var coachingStaff = await _context.CoachingStaffs.Include(c => c.Team).FirstOrDefaultAsync(c => c.Id == id);
            if (coachingStaff == null) return NotFound();
            return coachingStaff;
        }

        [HttpPost]
        public async Task<ActionResult<CoachingStaff>> PostCoachingStaff(CoachingStaff coachingStaff)
        {
            _context.CoachingStaffs.Add(coachingStaff);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCoachingStaff), new { id = coachingStaff.Id }, coachingStaff);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCoachingStaff(int id, CoachingStaff coachingStaff)
        {
            if (id != coachingStaff.Id) return BadRequest();

            _context.Entry(coachingStaff).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CoachingStaffExists(id)) return NotFound();
                else throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCoachingStaff(int id)
        {
            var coachingStaff = await _context.CoachingStaffs.FindAsync(id);
            if (coachingStaff == null) return NotFound();

            _context.CoachingStaffs.Remove(coachingStaff);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CoachingStaffExists(int id)
        {
            return _context.CoachingStaffs.Any(e => e.Id == id);
        }
    }
}
