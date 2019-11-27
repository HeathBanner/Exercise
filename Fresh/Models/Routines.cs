using System;
using MongoDB.Bson.Serialization.Attributes;

namespace Exercise.Models
{
    public class Routines
    {
        [BsonId]
        public Guid Id { get; set; }
        public string Title { get; set; }
        public RUpperBody UpperBody { get; set; }
    }

    public class RUpperBody
    {
        public BodyLog PushUps { get; set; }
        public BodyLog BenchPress { get; set; }
        public BodyLog PullUp { get; set; }
        public BodyLog BentOverRow { get; set; }
        public BodyLog ShoulderPress { get; set; }
        public BodyLog DeadLift { get; set; }
        public BodyLog BackSquat { get; set; }
        public BodyLog WalkingLunge { get; set; }
        public BodyLog FrontPlank { get; set; }
        public BodyLog SeatedHamstringCurl { get; set; }
    }
}
