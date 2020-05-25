using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactQuiz.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public List<Answer> Answers { get; set; }
        public string CorrectAnswer { get; set; }
    }
}
