using System;
using MongoDB.Bson.Serialization.Attributes;

namespace Exercise.Models
{
    public class Users
    {
        [BsonId]
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public WeeklyStats WeeklyStats { get; set; }
        public int CurrentWeek { get; set; }
        public Goal Goal { get; set; }
    }

    public class WeeklyStats
    {
        public Week Sunday { get; set; }
        public Week Monday { get; set; }
        public Week Tuesday { get; set; }
        public Week Wednesday { get; set; }
        public Week Thursday { get; set; }
        public Week Friday { get; set; }
        public Week Saturday { get; set; }
    }

    public class Week
    {
        public UpperBody UpperBody { get; set; }
        public int TotalCalories { get; set; }
    }

    public class UpperBody
    {
        public string[] Routines { get; set; }
        public LogDate Date { get; set; }
        public int Calories { get; set; }

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

    public class LogDate
    {
        public int Month { get; set; }
        public int Date { get; set; }
        public int Year { get; set; }
        public string Day { get; set; }
    }

    public class BodyLog
    {
        public int Reps { get; set; }
        public int Minutes { get; set; }
    }

    public class Goal
    {
        public string Type { get; set; }
        public string Target { get; set; }
        public int Increment { get; set; }
    }
}
