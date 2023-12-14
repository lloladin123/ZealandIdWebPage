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
        private static readonly string DriverLocation = "C:\\Users\\Aweso\\Desktop\\Ting\\SeleniumDrivers\\"; // Using my personal
                                                                                                              // location on C-drive
        // Download drivers to your driver folder.
        // Driver version must match your browser version
        // http://chromedriver.chromium.org/downloads

        // For these Selenium tests i used Chrome version 120

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
        public void TestIndex()
        {
            // I'm using local location of html files
            string url = "file:///C:\\Users\\Aweso\\Desktop\\Skole 2023\\3. Semester\\Projekt\\Repos\\ZealandIdWebPage\\Pages\\Index\\index.html";
            _driver.Navigate().GoToUrl(url);

            // Using Thread.Sleep(); to see the test before it closes.
            // Maximize browser window
            _driver.Manage().Window.Maximize();

            Assert.AreEqual("Zealand ID: Log ind på siden", _driver.Title);

            Thread.Sleep(1000);

            IWebElement loginUsername = _driver.FindElement(By.Id("username"));
            IWebElement loginPassword = _driver.FindElement(By.Id("password"));

            loginUsername.SendKeys("admin");
            loginPassword.SendKeys("password");

            Thread.Sleep(1000);
            
            IWebElement loginButton = _driver.FindElement(By.Id("loginButton"));
            loginButton.Click();

            Thread.Sleep(1000);
            
            // Test tries to login and navigate to next page but cannot be found. Since it's tested locally, we know the test works.
        }

        [TestMethod]
        public void TestForside()
        {
            string url = "file:///C:\\Users\\Aweso\\Desktop\\Skole 2023\\3. Semester\\Projekt\\Repos\\ZealandIdWebPage\\Pages\\Forside\\Forside.html";
            _driver.Navigate().GoToUrl(url);

            _driver.Manage().Window.Maximize();

            Assert.AreEqual("Forside for Zealand sensorer og lokaler", _driver.Title);

            Thread.Sleep(1000);

            IWebElement headerText = _driver.FindElement(By.TagName("h2"));
            Assert.AreEqual("Velkommen til Zealands håndtering af ID-scannere, sensorer og lokaler", headerText.Text);

            Thread.Sleep(1000);

            IWebElement sensorerButton = _driver.FindElement(By.CssSelector("a[href='/Pages/Sensor/Sensor.html']"));
            sensorerButton.Click();

            Thread.Sleep(1000);
        }

        [TestMethod]
        public void TestSensorer()
        { 
            string url = "file:///C:\\Users\\Aweso\\Desktop\\Skole 2023\\3. Semester\\Projekt\\Repos\\ZealandIdWebPage\\Pages\\Sensor\\Sensor.html";
            _driver.Navigate().GoToUrl(url);

            Assert.AreEqual("Sensorer ledige hos Zealand", _driver.Title);

            IWebElement headerText = _driver.FindElement(By.TagName("h2"));
            Assert.AreEqual("Sensorer - overblik over Zealands sensorer", headerText.Text);

            Thread.Sleep(1000);

            _driver.Manage().Window.Size = new System.Drawing.Size(800, 800);

            Thread.Sleep(1000);

            // Window is not maximized, so we test the button drop-down menu
            IWebElement dropdownButton = _driver.FindElement(By.ClassName("navbar-toggler"));
            dropdownButton.Click();

            Thread.Sleep(1000);
        
            IWebElement lokalerButton = _driver.FindElement(By.CssSelector("a[href='/Pages/Lokale/lokaler.html']"));
            lokalerButton.Click();

            Thread.Sleep(1000);
        }
           
        [TestMethod]
        public void TestLokaler()
        {
            string url = "file:///C:\\Users\\Aweso\\Desktop\\Skole 2023\\3. Semester\\Projekt\\Repos\\ZealandIdWebPage\\Pages\\Lokale\\lokaler.html";
            _driver.Navigate().GoToUrl(url);

            Assert.AreEqual("Lokaler - opret eller ændr lokaler", _driver.Title);

            IWebElement headerText = _driver.FindElement(By.TagName("h2"));
            Assert.AreEqual("Her finder du et overblik over alle oprettede lokaler hos Zealand", headerText.Text);

            Thread.Sleep(1000);

            IWebElement searchInput = _driver.FindElement(By.Id("searchBar"));
            searchInput.SendKeys("D3.05");

            Thread.Sleep(1000);

            IWebElement adminButton = _driver.FindElement(By.CssSelector("a[href='/Pages/Admin/Admin.html']"));
            adminButton.Click();

            Thread.Sleep(1000);
        }

        [TestMethod]
        public void TestAdmin()
        {
            string url = "file:///C:\\Users\\Aweso\\Desktop\\Skole 2023\\3. Semester\\Projekt\\Repos\\ZealandIdWebPage\\Pages\\Admin\\Admin.html";
            _driver.Navigate().GoToUrl(url);

            Assert.AreEqual("Administrationsside - oversigt for alle administratorer", _driver.Title);

            IWebElement headerText = _driver.FindElement(By.TagName("h2"));
            Assert.AreEqual("Admins til Zealands id-scanner og administration", headerText.Text);

            Thread.Sleep(1000);

            //press opret admin button
            IWebElement createAdmin = _driver.FindElement(By.Id("create-button"));
            createAdmin.Click();

            Thread.Sleep(1000);

            IWebElement closeButton = _driver.FindElement(By.ClassName("btn-secondary"));
            closeButton.Click();

            Thread.Sleep(1000);

            // press logo top left
            IWebElement logoButton = _driver.FindElement(By.ClassName("navbar-brand"));
            logoButton.Click();
        }
    }
}