using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Exercise.Models;
using Exercise.Services;

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
        [Route("{username}")]
        public ActionResult<Users> Create(string username, [FromBody] Users log)
        {
            _logService.Create(log);

            return CreatedAtRoute("default", new { id = log.Id.ToString(), }, log);
        }

        [Route("goal")]
        public ActionResult<Goal> Create([FromBody] Goal goal)
        {
            _logService.setGoal(goal);

            return CreatedAtRoute("default", new { goal = goal.Type }, goal);
        }
    }
}
