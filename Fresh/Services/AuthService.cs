using System;
using Exercise.Models;
using MongoDB.Driver;

namespace Exercise.Services
{
    public class AuthService
    {
        private readonly IMongoCollection<Users> _users;

        public AuthService(IExerciseDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<Users>(settings.UsersCollectionName);
        }

        public bool Create(Users user)
        {
            var qFilter = Builders<Users>.Filter.Eq("Username", user.Username);
            var query = _users.Find(qFilter).ToList();

            Console.WriteLine("\n\n\n {0} \n\n\n", query.Count);

            if (query.Count > 0) return false;

            _users.InsertOne(user);

            return true;
        }
    }
}
