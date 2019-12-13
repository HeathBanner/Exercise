using System;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq;
using Exercise.Models;
using System.Net.Http;
using System.Net;

namespace Exercise.Services
{
    public class WorkoutLogService : WorkoutLogTools
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

        public List<Users> Get(string username, out List<Users> document)
        {
            var filter = Builders<Users>.Filter.Eq("Username", username);
            return document = _users.Find(filter).ToList();
        }

        public HttpResponseMessage Create(Users user)
        {
            var result = _users.Find(new BsonDocument()).ToList();
            var Heath = result[0];

            string dayOfWeek = user.CurrentWeek.Day;

            Week newDay;
            DaySelector(user.WeeklyStats[0], user.CurrentWeek.Day, out newDay);

            int diff = DayDiff(user.CurrentWeek.Date, dayOfWeek);
            bool flag = checkDate(user.CurrentWeek, Heath.CurrentWeek, diff);

            if (flag == false)
            {
                var filter = Builders<Users>.Filter.And(
                    Builders<Users>.Filter.Eq("Username", "Heath"),
                    Builders<Users>.Filter.ElemMatch(x => x.WeeklyStats, y => y.Date == diff));
                var update = new UpdateDefinitionBuilder<Users>()
                    .Set($"WeeklyStats.$.{dayOfWeek}", newDay);

                _users.FindOneAndUpdate(filter, update);
            }
            if (flag == true)
            {
                var filter = Builders<Users>.Filter.Eq("Username", "Heath");
                var update = Builders<Users>.Update
                    .Set("CurrentWeek", user.CurrentWeek)
                    .Push("WeeklyStats", user.WeeklyStats[0]);

                _users.UpdateOne(filter, update);
            }

            return new HttpResponseMessage(HttpStatusCode.Created);
        }

        public HttpResponseMessage setGoal(Goal goal)
        {
            var filter = Builders<Users>.Filter.Eq("Username", "Heath");
            var options = new FindOneAndUpdateOptions<Users>()
            {
                ReturnDocument = ReturnDocument.After
            };
            var update = Builders<Users>.Update.Set("Goal", goal);

            var result = _users.FindOneAndUpdate(filter, update, options);

            if (result.Goal.Target != goal.Target)
            {
                return new HttpResponseMessage(HttpStatusCode.NotModified);
            }
            return new HttpResponseMessage(HttpStatusCode.Created);
        }

        public List<Users> getByDate(LogDate date, out List<Users> document)
        {
            var filter = Builders<Users>.Filter.Eq("Username", "Heath");
            List<Users> query = _users.Find(filter).ToList();

            int arrSize = query.Count - 1;

            int diff = DayDiff(date.Date, date.Day);
            bool flag = checkDate(query[arrSize].CurrentWeek, date, diff);

            if (flag) return document = new List<Users>();
            return document = query;
        }
    }
}
