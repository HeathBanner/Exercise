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

        public List<Users> Get(string username, out List<Users> document)
        {
            var filter = Builders<Users>.Filter.Eq("Username", username);
            return document = _users.Find(filter).ToList();
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
            int date = user.CurrentWeek.Date;
            int diff = date - 1;

            var flag = false;
            string[] Days = { "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" };


            Week newDay;
            WorkoutLogTools tools = new WorkoutLogTools();

            tools.DaySelector(user.WeeklyStats[0], user.CurrentWeek.Day, out newDay);

            if (user.CurrentWeek.Year != Heath.CurrentWeek.Year) flag = true;
            else if (user.CurrentWeek.Month != Heath.CurrentWeek.Month) flag = true;
            else if (user.CurrentWeek.Date - Heath.CurrentWeek.Date >= 7) flag = true;

            if (flag == false)
            {
                var filter = Builders<Users>.Filter.And(
                    Builders<Users>.Filter.Eq("Username", "Heath"),
                    Builders<Users>.Filter.ElemMatch(x => x.WeeklyStats, y => y.Date == diff));
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

        public Goal setGoal(Goal goal)
        {
            var filter = Builders<Users>.Filter.Eq("Username", "Heath");
            var update = Builders<Users>.Update.Set("Goal", goal);

            _users.UpdateOne(filter, update);

            return goal;
        }

        public List<Users> getByDate(LogDate date, out List<Users> document)
        {

            var filter = Builders<Users>.Filter.Eq("Username", "Heath");
            List<Users> query = _users.Find(filter).ToList();

            int arrSize = query.Count - 1;
            bool flag = false;

            if (query[arrSize].CurrentWeek.Year != date.Year) flag = true;
            else if (query[arrSize].CurrentWeek.Month != date.Month) flag = true;
            else if (query[arrSize].CurrentWeek.Date - date.Date <= 7) flag = true;

            Console.WriteLine("\n\n\n {0} \n {1} \n {2} \n\n\n", flag, query[arrSize].CurrentWeek.Date, date.Date);

            if (flag) return document = new List<Users>();

            return document = query;
        }
    }
}
