using ReactQuiz.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactQuiz.Data
{
    public class DbInitializer
    {
        public static async Task Initialize(ApplicationDbContext context)
        {
            if (!context.Questions.Any())
            {
                var questions = new List<Question>
                {
                    new Question
                    {
                        Content = "What is the world's most populated country?",
                        CorrectAnswer = "China",
                        Answers = new List<Answer>
                        {
                            new Answer
                            {
                                Content = "USA"
                            },
                            new Answer
                            {
                                Content = "Russia"
                            },
                            new Answer
                            {
                                Content = "India"
                            },
                            new Answer
                            {
                                Content = "China"
                            }
                        }
                    },
                    new Question
                    {
                        Content = "Who was the original King of rock n' roll?",
                        CorrectAnswer = "Elvis Presley",
                        Answers = new List<Answer>
                        {
                            new Answer
                            {
                                Content = "Michael Jackson"
                            },
                            new Answer
                            {
                                Content = "Mick Jagger"
                            },
                            new Answer
                            {
                                Content = "Elvis Presley",
                            },
                            new Answer
                            {
                                Content = "Steven Tyler"
                            }
                        }
                    },
                    new Question
                    {
                        Content = "What plant is traditionally the primary ingredient in wine?",
                        CorrectAnswer = "Grape",
                        Answers = new List<Answer>
                        {
                            new Answer
                            {
                                Content = "Agave"
                            },
                            new Answer
                            {
                                Content = "Apple"
                            },
                            new Answer
                            {
                                Content = "Grape"
                            },
                            new Answer
                            {
                                Content = "Plum"
                            }
                        }
                    }                    
                };

                context.Questions.AddRange(questions);
                await context.SaveChangesAsync();
            }
        }
    }
}
