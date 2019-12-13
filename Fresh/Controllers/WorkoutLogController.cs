using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Exercise.Models;
using Exercise.Services;
using System.Net.Http;

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
        public HttpResponseMessage Create(string username, [FromBody] Users log)
        {
            var response = _logService.Create(log);

            return response;
        }

        [Route("goal")]
        public HttpResponseMessage Create([FromBody] Goal goal)
        {
            var response = _logService.setGoal(goal);

            return response;
        }
    }
}
