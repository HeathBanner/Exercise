using System;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq;
using Exercise.Models;

namespace Exercise.Services
{
    public class WorkoutLogService
    {
        private readonly IMongoCollection<WorkoutLog> _logs;

        public WorkoutLogService(IExerciseDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _logs = database.GetCollection<WorkoutLog>(settings.WorkoutLogCollectionName);
        }

        public List<WorkoutLog> Get()
        {
            var document = _logs.Find(new BsonDocument()).ToList();
            return document;
        }

        public WorkoutLog Create(WorkoutLog log)
        {
            _logs.InsertOne(log);
            return log;
        }
    }
}
