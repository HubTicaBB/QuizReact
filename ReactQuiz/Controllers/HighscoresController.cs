﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactQuiz.Data;
using ReactQuiz.Models;

namespace ReactQuiz.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HighscoresController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HighscoresController(ApplicationDbContext context)
        {
            _context = context;
        }
       
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Highscore>>> GetHighscores()
        {
            var highscores = await _context.Highscores.OrderByDescending(h => h.Points).ToListAsync();

            if (highscores == null)
            {
                return NotFound();
            }

            return Ok(highscores);
        }


        [HttpPost]
        public async Task<ActionResult<Highscore>> PostHighscore([FromBody] Highscore highscore)
        {
            if (!ModelState.IsValid || highscore.Date == new DateTime(0001, 1, 1, 0, 0, 0))
            {                
                return BadRequest();
            }
            _context.Highscores.Add(highscore);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHighscore", new { id = highscore.Id }, highscore);
        }
    }
}
