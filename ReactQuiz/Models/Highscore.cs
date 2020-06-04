using System;
using System.ComponentModel.DataAnnotations;

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
