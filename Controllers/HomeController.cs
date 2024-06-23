using Microsoft.AspNetCore.Mvc;
using OnsharpBowling2.Models;
using System.Diagnostics;

namespace OnsharpBowling2.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Tips()
        {
            return View();
        }

        public IActionResult APIDocumentation()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        private const string SessionKeyPlayers = "Players";

        [HttpGet]
        public IActionResult GetPlayers()
        {
            var players = HttpContext.Session.Get<List<string>>(SessionKeyPlayers) ?? new List<string>();
            return Json(players);
        }

        [HttpPost]
        public IActionResult AddPlayer([FromBody] PlayerModel player)
        {
            if (player == null || string.IsNullOrWhiteSpace(player.Name))
            {
                return BadRequest("Invalid player name.");
            }

            var players = HttpContext.Session.Get<List<string>>(SessionKeyPlayers) ?? new List<string>();
            players.Add(player.Name);
            HttpContext.Session.Set(SessionKeyPlayers, players);

            return Json(players);
        }

        [HttpPost]
        public IActionResult RemovePlayer([FromBody] PlayerModel player)
        {
            if (player == null || string.IsNullOrWhiteSpace(player.Name))
            {
                return BadRequest("Invalid player name.");
            }

            var players = HttpContext.Session.Get<List<string>>(SessionKeyPlayers) ?? new List<string>();
            players.Remove(player.Name);
            HttpContext.Session.Set(SessionKeyPlayers, players);

            return Json(players);
        }
    }
}
