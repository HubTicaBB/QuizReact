using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactQuiz.Models
{
    public class Highscore
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public int Points { get; set; }
        public DateTime Date { get; set; }
    }
}
