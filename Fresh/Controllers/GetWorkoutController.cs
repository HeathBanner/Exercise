using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Exercise.Models;
using Microsoft.AspNetCore.Mvc;
using Exercise.Services;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Exercise.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GetWorkoutController : ControllerBase
    {
        private readonly ExerciseService _exerciseService;

        public GetWorkoutController(ExerciseService exerciseService)
        {
            _exerciseService = exerciseService;
        }

        [HttpGet]
        public ActionResult<List<Routines>> Get() =>
            _exerciseService.Get();

        [HttpPost]
        public ActionResult<Routines> Create([FromBody] Routines routines)
        {
            _exerciseService.Create(routines);

            return CreatedAtRoute("default", new { id = routines.Id.ToString() }, routines);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] string id)
        {
            _exerciseService.Remove(id);

            return NoContent();
        }
    }
}
