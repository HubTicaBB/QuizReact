using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ReactQuiz.Models
{
    public class Highscore
    {
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public int Points { get; set; }

        [Required]
        public DateTime Date { get; set; }
    }
}
