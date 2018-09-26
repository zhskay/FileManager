using System.Web.Configuration;

namespace FileManager.Services
{
    public interface ISettingsService
    {
        string FilesPath { get; }
    }

    public class SettingsService : ISettingsService
    {
        public string FilesPath => GetSetting(nameof(FilesPath));

        private string GetSetting(string settingName) => WebConfigurationManager.AppSettings[settingName];
    }
}