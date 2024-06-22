using Microsoft.AspNetCore.Mvc;
using OnsharpBowling2.Models;
using System.Diagnostics;

namespace OnsharpBowling2.Controllers
{
    public class GameController : Controller
    {
        private readonly ILogger<GameController> _logger;

        public GameController(ILogger<GameController> logger)
        {
            _logger = logger;
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        private const string SessionKeyGames = "Games";

        [HttpGet]
        public IActionResult GetGames()
        {
            var games = HttpContext.Session.Get<List<PlayerModel>>(SessionKeyGames) ?? new List<PlayerModel>();
            return Json(games);
        }

        [HttpPost]
        public IActionResult FinishGame([FromBody] List<PlayerModel> game)
        {
            if (game == null || game.Count == 0)
            {
                return BadRequest("Invalid game.");
            }

            var games = HttpContext.Session.Get<List<PlayerModel>>(SessionKeyGames) ?? new List<PlayerModel>();
            games.AddRange(game);
            HttpContext.Session.Set(SessionKeyGames, games);

            return Json(games);
        }

        [HttpPost]
        public IActionResult ClearGameHistory()
        {
            HttpContext.Session.Remove(SessionKeyGames);
            return Ok("Game history cleared successfully.");
        }
    }
}
