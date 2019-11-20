﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Exercise.Models;
using Exercise.Services;
using MongoDB.Bson;
using MongoDB.Driver;

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
        public ActionResult<List<WorkoutLog>> Get() =>
            _logService.Get();

        [HttpPost]
        public ActionResult<WorkoutLog> Create([FromBody] WorkoutLog log)
        {
            _logService.Create(log);

            return CreatedAtRoute("default", new { id = log.Id.ToString(), }, log);
        }
    }
}