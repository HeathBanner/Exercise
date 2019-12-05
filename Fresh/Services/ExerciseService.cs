using System;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq;
using Exercise.Models;

namespace Exercise.Services
{
    public class ExerciseService
    {
        private readonly IMongoCollection<Routines> _exercise;

        public ExerciseService(IExerciseDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _exercise = database.GetCollection<Routines>(settings.RoutinesCollectionName);
        }

        public List<Routines> Get()
        {
            var document = _exercise.Find(new BsonDocument()).ToList();

            return document;
        }

        public Routines Get(string id) =>
            _exercise.Find<Routines>(book => book.Id.ToString() == id).FirstOrDefault();

        public Routines Create(Routines routines)
        {
            _exercise.InsertOne(routines);
            return routines;
        }

        public void Remove(string routine)
        {
            var filter = Builders<Routines>.Filter.Eq("Title", routine);

            _exercise.DeleteOne(filter);
        }
    }
}
