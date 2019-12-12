using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Exercise.Models;
using Exercise.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Exercise.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        [Route("register")]
        public HttpResponseMessage Create([FromBody] Users user)
        {
            HttpResponseMessage result = _authService.Create(user);

            return result;
        }

        [Route("login")]
        public HttpResponseMessage Verify([FromBody] Users user)
        {
            HttpResponseMessage result = _authService.Verify(user);

            return result;
        }
    }
}
