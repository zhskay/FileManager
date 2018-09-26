using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using FileManager.Models;
using FileManager.Models.Enums;
using FileNotFoundException = FileManager.Exceptions.FileNotFoundException;

namespace FileManager.Services
{
    public class FilesService : IFilesService
    {
        #region Constants

        public const int MAX_FILE_PATH_LENGTH = 259;

        private static readonly string[] _imageEx = { ".png", ".img", ".jpeg", ".jpg" };
        private static readonly string[] _docEx = { ".txt", ".doc", ".docx" };
        private static readonly string[] _media = { ".mp3", ".wav", ".avi" };

        #endregion

        private readonly ISettingsService _settingsService;

        public FilesService(ISettingsService settingsService)
        {
            _settingsService = settingsService;
        }

        /// <inheritdoc cref="IFilesService.GetFiles"/>
        public IEnumerable<FileModel> GetFiles()
        {
            var filesPath = HttpContext.Current.Server.MapPath(_settingsService.FilesPath);

            if (!Directory.Exists(filesPath))
            {
                return new List<FileModel>();
            }

            var di = new DirectoryInfo(filesPath);
            var models = di.GetFiles().Select(fileInfo => new FileModel
            {
                Name = fileInfo.Name,
                CreatedDate = fileInfo.CreationTimeUtc,
                LastModifiedDate = fileInfo.LastWriteTimeUtc,
                Type = GetFileType(fileInfo)
            });

            return models;
        }

        /// <inheritdoc cref="IFilesService.SaveFiles"/>
        public IEnumerable<FileModel> SaveFiles(HttpFileCollection files)
        {
            var filesPath = HttpContext.Current.Server.MapPath(_settingsService.FilesPath);

            if (!Directory.Exists(filesPath))
            {
                Directory.CreateDirectory(filesPath);
            }

            var models = new List<FileModel>();

            foreach (string file in files)
            {
                var postedFile = files[file];

                var fileName = GetFileName(postedFile);
                var filePath = HttpContext.Current.Server.MapPath(_settingsService.FilesPath + "/" + fileName);

                postedFile.SaveAs(filePath);

                models.Add(new FileModel
                {
                    Name = postedFile.FileName,
                    CreatedDate = DateTime.UtcNow,
                    LastModifiedDate = DateTime.UtcNow,
                    Type = GetFileType(new FileInfo(filePath))
                });
            }

            return models;
        }

        /// <inheritdoc cref="IFilesService.DeleteFile"/>
        public FileModel DeleteFile(string fileName)
        {
            var filePath = HttpContext.Current.Server.MapPath(_settingsService.FilesPath + $"/{fileName}");

            if (!File.Exists(filePath))
            {
                throw new FileNotFoundException();
            }

            var file = new FileInfo(filePath);
            File.Delete(filePath);

            return new FileModel
            {
                Name = file.Name,
                CreatedDate = file.CreationTimeUtc,
                LastModifiedDate = file.LastWriteTimeUtc,
                Type = GetFileType(file)
            };
        }

        /// <inheritdoc cref="IFilesService.GetFileStream"/>
        public FileStream GetFileStream(string fileName)
        {
            var filePath = HttpContext.Current.Server.MapPath(_settingsService.FilesPath + $"/{fileName}");

            if (string.IsNullOrEmpty(filePath) || !File.Exists(filePath))
            {
                throw new FileNotFoundException();
            }

            return new FileStream(filePath, FileMode.Open, FileAccess.Read);
        }

        #region Private

        private FileType GetFileType(FileSystemInfo file)
        {
            if (_imageEx.Contains(file.Extension))
            {
                return FileType.Image;
            }

            if (_docEx.Contains(file.Extension))
            {
                return FileType.Document;
            }

            if (_media.Contains(file.Extension))
            {
                return FileType.Media;
            }

            return FileType.Unknown;
        }

        private string GetFileName(HttpPostedFile file)
        {
            var directoryPath = HttpContext.Current.Server.MapPath(_settingsService.FilesPath + "/");
            var allowedLength = MAX_FILE_PATH_LENGTH - directoryPath.Length;

            var extensionDotIndex = file.FileName.LastIndexOf('.');

            if (extensionDotIndex > -1)
            {
                var extension = file.FileName.Substring(extensionDotIndex);
                allowedLength = allowedLength - extension.Length;

                return file.FileName.Substring(0, allowedLength > file.FileName.Length - extension.Length
                           ? file.FileName.Length - extension.Length
                           : allowedLength)
                       + extension;
            }

            return file.FileName.Substring(0, allowedLength > file.FileName.Length
                ? file.FileName.Length
                : allowedLength);
        }

        #endregion
    }
}