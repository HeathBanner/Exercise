using System;

namespace Exercise.Models
{
    public class ExerciseDatabaseSettings : IExerciseDatabaseSettings
    {
        public string RoutinesCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IExerciseDatabaseSettings
    {
        string RoutinesCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
