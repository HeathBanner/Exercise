using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Exercise.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Exercise.Controllers
{
    public class AuthController : Controller
    {
        private readonly UserManager<Users> _userManager;
        private readonly SignInManager<Users> _signInManager;

        public IActionResult Index()
        {
            return View();
        }

        public AuthController(UserManager<Users> userManager, SignInManager<Users> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [Authorize]
        public IActionResult Secret()
        {
            return View();
        }

        public async IActionResult Login(string username, string password)
        {
            var user = await _userManager.FindByNameAsync(username);

            if (user != null)
            {
                _signInManager.PasswordSignInAsync(user, password, false, false);
            }

            return RedirectToAction("/");
        }

        public async Task<IActionResult> RegisterAsync(string username, string email, string password)
        {
            Users user = new Users{ Username = username };

            var result = await _userManager.CreateAsync(user, password);

            if (result.Succeeded)
            {

            }

            return RedirectToAction("Index");
        }
    }
}
