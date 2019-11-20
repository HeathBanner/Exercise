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
        public string date { get; set; }
    }
}
