using System;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq;
using Exercise.Models;
using Microsoft.AspNetCore.Mvc;

namespace Exercise.Services
{
    public class ExerciseService
    {
        private readonly IMongoCollection<Routines> _books;

        public ExerciseService(IExerciseDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _books = database.GetCollection<Routines>(settings.RoutinesCollectionName);
        }

        public List<Routines> Get()
        {
            var document = _books.Find(new BsonDocument()).ToList();
            return document;
        }

        public Routines Get(string id) =>
            _books.Find<Routines>(book => book.Id.ToString() == id).FirstOrDefault();

        public Routines Create(Routines routines)
        {
            _books.InsertOne(routines);
            return routines;
        }

        public void Remove(string routine)
        {
            var filter = Builders<Routines>.Filter.Eq("Title", routine);

            _books.DeleteOne(filter);
        }
    }
}
