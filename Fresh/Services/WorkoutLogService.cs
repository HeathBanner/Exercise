using System;
using System.Diagnostics;
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
        private readonly IMongoCollection<Users> _users;

        public WorkoutLogService(IExerciseDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _logs = database.GetCollection<WorkoutLog>(settings.WorkoutLogCollectionName);
            _users = database.GetCollection<Users>(settings.UsersCollectionName);
        }

        public List<WorkoutLog> Get()
        {
            var document = _logs.Find(new BsonDocument()).ToList();
            return document;
        }

        public WorkoutLog Create(WorkoutLog log)
        {
            Debug.WriteLine("============\n\n\n" + log + "\n\n\n============");

            _logs.InsertOne(log);
            return log;
        }

        public Users Create(Users user)
        {
            //var result = _users.Find(new BsonDocument()).ToList();
            //var Heath = result[0];

            //var flag = false;

            //if (user.Date.Year != Heath.CurrentWeek.Year)
            //{
            //    flag = true;
            //}
            //else if (info.Date.Month != Heath.CurrentWeek.Month)
            //{
            //    flag = true;
            //}
            //else if (info.Date.Date - Heath.CurrentWeek.Date > 6)
            //{
            //    flag = true;
            //}

            //if (flag == false)
            //{
            //    var filter = Builders<Users>.Filter.Eq("Username", "Heath");
            //    var update = Builders<Users>.Update.Push("WeeklyStats", newWeek);
            //    _users.UpdateOne(filter, update);
            //}
            //if (flag == true)
            //{
            //};

                var filter = Builders<Users>.Filter.Eq("Username", "Heath");
            var update = Builders<Users>.Update
                .Set("CurrentWeek", user.CurrentWeek)
                .Push("WeeklyStats", user.WeeklyStats[0]);
            _users.UpdateOne(filter, update);
            //}

            return user;
        }
    }
}
