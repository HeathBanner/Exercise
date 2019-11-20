using System;
using MongoDB.Bson.Serialization.Attributes;

namespace Exercise.Models
{
    public class WorkoutLog
    {
        [BsonId]
        public Guid Id { get; set; }
        public string Routine { get; set; }
        public Exercise[] Exercise { get; set; }
        public LogDate Date { get; set; }
        public int Calories { get; set; }
    }

    public class LogDate
    {
        public int Month { get; set; }
        public int Date { get; set; }
        public int Year { get; set; }
        public string Day { get; set; }
    }
}
