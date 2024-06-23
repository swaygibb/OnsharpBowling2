using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using OnsharpBowling2.Controllers;
using OnsharpBowling2.Models;

namespace OnsharpBowling2.Tests
{
    [TestClass]
    public class GameControllerTests
    {
        private GameController? _controller;
        private Mock<ILogger<GameController>>? _mockLogger;

        [TestInitialize]
        public void Setup()
        {
            _mockLogger = new Mock<ILogger<GameController>>();
            _controller = new GameController(_mockLogger.Object);
        }

        [TestMethod]
        public void GetGames_ReturnsJsonResult()
        {
            // Act
            var result = _controller.GetGames() as JsonResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Value, typeof(List<PlayerModel>));
            // Add more specific assertions based on expected behavior
        }

        [TestMethod]
        public void FinishGame_ReturnsJsonResult()
        {
            // Arrange
            var game = new List<PlayerModel>
            {
                new PlayerModel { Name = "Player1" },
                new PlayerModel { Name = "Player2" }
            };

            // Act
            var result = _controller.FinishGame(game) as JsonResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Value, typeof(List<PlayerModel>));
            // Add more specific assertions based on expected behavior
        }

        [TestMethod]
        public void ClearGameHistory_ReturnsOkResult()
        {
            // Act
            var result = _controller.ClearGameHistory() as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual("Game history cleared successfully.", result.Value);
        }
    }
}
