using System;

namespace Exercise.Models
{
    public class ExerciseDatabaseSettings : IExerciseDatabaseSettings
    {
        public string UsersCollectionName { get; set; }
        public string RoutinesCollectionName { get; set; }
        public string WorkoutLogCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IExerciseDatabaseSettings
    {
        public string UsersCollectionName { get; set; }
        string RoutinesCollectionName { get; set; }
        string WorkoutLogCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
