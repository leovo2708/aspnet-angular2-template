using Microsoft.AspNetCore.Mvc;

namespace Angular2WebApplication.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View("~/wwwroot/report1/index.cshtml");
        }
    }
}
