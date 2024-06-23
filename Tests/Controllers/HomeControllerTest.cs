using Microsoft.AspNetCore.Mvc;
using Moq;
using OnsharpBowling2.Controllers;
using OnsharpBowling2.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace OnsharpBowling2.Tests
{
    [TestClass]
    public class HomeControllerTests
    {
        private HomeController? _controller;
        private Mock<ILogger<HomeController>>? _mockLogger;

        [TestInitialize]
        public void Setup()
        {
            _mockLogger = new Mock<ILogger<HomeController>>();
            _controller = new HomeController(_mockLogger.Object);
        }

        [TestMethod]
        public void Index_ReturnsViewResult()
        {
            // Act
            var result = _controller.Index() as ViewResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsTrue(string.IsNullOrEmpty(result.ViewName) || result.ViewName == "Index"); // Assuming view name is "Index"
        }

        [TestMethod]
        public void Tips_ReturnsViewResult()
        {
            // Act
            var result = _controller.Tips() as ViewResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsTrue(string.IsNullOrEmpty(result.ViewName) || result.ViewName == "Tips"); // Assuming view name is "Tips"
        }

        [TestMethod]
        public void Error_ReturnsViewResultWithModel()
        {
            // Act
            var result = _controller.Error() as ViewResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Model, typeof(ErrorViewModel));
        }
    }
}
