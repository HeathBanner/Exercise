using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Exercise.Models;
using Exercise.Services;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Diagnostics;

namespace Exercise.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorkoutLogController : ControllerBase
    {
        private readonly WorkoutLogService _logService;

        public WorkoutLogController(WorkoutLogService logService)
        {
            _logService = logService;
        }

        [HttpGet]
        [Route("username={username}")]
        public ActionResult<List<Users>> Get(string username)
        {
            List<Users> document;

            _logService.Get(username, out document);
            return document;
        }

        [Route("year={year}&month={month}&date={date}")]
        public ActionResult<List<Users>> Get(int year, int month, int date)
        {

            Console.WriteLine("\n\n\n {0} \n {1} \n {2} \n\n\n", year, month, date);
            LogDate today = new LogDate
            {
                Year = year,
                Month = month,
                Date = date
            };

            List<Users> document;

            _logService.getByDate(today, out document);

            return document;
        }

        [HttpPost]
        [Route("")]
        public ActionResult<WorkoutLog> Create([FromBody] WorkoutLog log)
        {
            _logService.Create(log);

            return CreatedAtRoute("default", new { id = log.Id.ToString(), }, log);
        }

        [Route("goal")]
        public ActionResult<Goal> Create([FromBody] Goal goal)
        {
            var query = HttpContext.Request.Query["service"].ToString();
            Console.WriteLine("\n\n\n {0} \n\n\n", query);

            _logService.setGoal(goal);

            return CreatedAtRoute("default", new { goal = goal.Type }, goal);
        }
    }
}
