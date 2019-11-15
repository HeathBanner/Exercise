using System;
using MongoDB.Bson.Serialization.Attributes;

namespace Exercise.Models
{
    public class Routines
    {
        [BsonId]
        public Guid Id { get; set; }
        public string Title { get; set; }
        public Exercise[] Exercise { get; set; }
    }
    public class Exercise
    {
        public int Reps { get; set; }
        public int Length { get; set; }
        public string[] Focus { get; set; }
        public string Title { get; set; }
    }
}
