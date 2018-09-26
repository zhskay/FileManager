using System.Web.Http;
using FileManager.App_Start;

namespace FileManager
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);

            SimpleInjectorConfig.Configure();
        }
    }
}
