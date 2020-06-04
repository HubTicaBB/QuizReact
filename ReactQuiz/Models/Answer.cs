using System.ComponentModel.DataAnnotations;


namespace ReactQuiz.Models
{
    public class Answer
    {
        public int Id { get; set; }
       
        [Required]
        public string Content { get; set; }
    }
}
