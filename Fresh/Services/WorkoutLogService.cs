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
            _logs.InsertOne(log);
            return log;
        }

        public Users Create(Users user)
        {
            var result = _users.Find(new BsonDocument()).ToList();
            var Heath = result[0];

            var dayOfWeek = user.CurrentWeek.Day;
            Week newDay = null;

            switch (user.CurrentWeek.Day)
            {
                case "Sunday":
                    newDay = user.WeeklyStats[0].Sunday;
                    break;
                case "Monday":
                    newDay = user.WeeklyStats[0].Monday;
                    break;
                case "Tuesday":
                    newDay = user.WeeklyStats[0].Tuesday;
                    break;
                case "Wednesday":
                    newDay = user.WeeklyStats[0].Wednesday;
                    break;
                case "Thurday":
                    newDay = user.WeeklyStats[0].Thursday;
                    break;
                case "Friday":
                    newDay = user.WeeklyStats[0].Friday;
                    break;
                default:
                    newDay = user.WeeklyStats[0].Saturday;
                    break;
            }

            var flag = false;

            if (user.CurrentWeek.Year != Heath.CurrentWeek.Year)
            {
                flag = true;
            }
            else if (user.CurrentWeek.Month != Heath.CurrentWeek.Month)
            {
                flag = true;
            }
            else if (user.CurrentWeek.Date - Heath.CurrentWeek.Date >= 6)
            {
                flag = true;
            }

            if (flag == false)
            {
                var filter = Builders<Users>.Filter.And(
                    Builders<Users>.Filter.Eq("Username", "Heath"),
                    Builders<Users>.Filter.ElemMatch(x => x.WeeklyStats, y => y.Date == 25) );
                var update = new UpdateDefinitionBuilder<Users>()
                    .Set($"WeeklyStats.$.{dayOfWeek}", newDay);

                _users.UpdateOne(filter, update);
            }
            if (flag == true)
            {
                var filter = Builders<Users>.Filter.Eq("Username", "Heath");
                var update = Builders<Users>.Update
                    .Set("CurrentWeek", user.CurrentWeek)
                    .Push("WeeklyStats", user.WeeklyStats[0]);
                _users.UpdateOne(filter, update);
            }

            return user;
        }
    }
}
