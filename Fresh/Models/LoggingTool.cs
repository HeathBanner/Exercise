using System;
using MongoDB.Bson.Serialization.Attributes;

namespace Exercise.Models
{
    public class LoggingTool
    {
        [BsonId]
        public Guid Id { get; set; }
        public string Username { get; set; }
        public UpperBody UpperBody { get; set; }
        public int Calories { get; set; }
        public LogDate Date { get; set; }
        public string Routine { get; set; }
    }
}
