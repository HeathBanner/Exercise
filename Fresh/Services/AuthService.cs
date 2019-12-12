using System;
using Exercise.Models;
using MongoDB.Driver;
using System.Net.Http;
using System.Net;

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

        public HttpResponseMessage Create(Users user)
        {
            var qFilter = Builders<Users>.Filter.Eq("Username", user.Username);
            var query = _users.Find(qFilter).ToList();

            if (query.Count > 0) return new HttpResponseMessage(HttpStatusCode.Forbidden);

            _users.InsertOne(user);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }

        public HttpResponseMessage Verify(Users user)
        {
            var qFilter = Builders<Users>.Filter.Eq("Username", user.Username);
            var query = _users.Find(qFilter).ToList();

            if (query.Count == 0) return new HttpResponseMessage(HttpStatusCode.NotFound);
            if (query[0].Password != user.Password) return new HttpResponseMessage(HttpStatusCode.Unauthorized);

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
