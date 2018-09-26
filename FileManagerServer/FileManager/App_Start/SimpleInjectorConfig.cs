using System.Web.Http;
using FileManager.Services;
using SimpleInjector;
using SimpleInjector.Integration.WebApi;
using SimpleInjector.Lifestyles;

namespace FileManager.App_Start
{
    public class SimpleInjectorConfig
    {
        public static Container Configure()
        {
            // Create the container as usual.
            var container = new Container();
            container.Options.DefaultScopedLifestyle = new AsyncScopedLifestyle();

            container.Options.DefaultLifestyle = new AsyncScopedLifestyle();

            Register(container);

            // This is an extension method from the integration package.
            container.RegisterWebApiControllers(GlobalConfiguration.Configuration);

            container.Verify();

            GlobalConfiguration.Configuration.DependencyResolver =
                new SimpleInjectorWebApiDependencyResolver(container);
            return container;
        }

        private static void Register(Container container)
        {
            container.Register<ISettingsService, SettingsService>();
            container.Register<IFilesService, FilesService>(Lifestyle.Scoped);
        }
    }
}