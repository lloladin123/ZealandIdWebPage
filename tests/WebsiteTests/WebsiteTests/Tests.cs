using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;

namespace WebsiteTests
{
    [TestClass]
    public class Tests
    {
        // For these Selenium tests, we used a Chrome Driver.
        private static readonly string DriverLocation = "Insert driver location here";

        // Download drivers to your driver folder.
        // Driver version must match your browser version
        // http://chromedriver.chromium.org/downloads

        private static IWebDriver _driver;

        [ClassInitialize]
        public static void Setup(TestContext context)
        {
            _driver = new ChromeDriver(DriverLocation);
        }

        [ClassCleanup]
        public static void Cleanup()
        {
            _driver.Dispose();
        }

        [TestMethod]
        public void TestMethod1()
        {
            // string url = "https://ourWebsiteOnAzure.azurewebsites.net/";

            string url = "file location goes here";
            _driver.Navigate().GoToUrl(url);

        }









    }
}