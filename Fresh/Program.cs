using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Exercise.Models;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;

namespace Exercise
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var db = new Engine("ExerciseApp");
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
