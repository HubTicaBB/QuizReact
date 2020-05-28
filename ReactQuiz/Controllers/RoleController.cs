using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactQuiz.Data;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReactQuiz.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class RoleController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RoleController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetAdminRole()
        {
            var adminRole = await _context.UserRoles.FirstOrDefaultAsync();

            if (adminRole == null)
            {
                return NotFound();
            }
            return Ok(adminRole);
        }
    }
}
