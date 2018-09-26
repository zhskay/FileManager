using System.Collections.Generic;
using System.IO;
using System.Web;
using FileManager.Models;

namespace FileManager.Services
{
    public interface IFilesService
    {
        /// <summary>
        /// Get file as stream
        /// </summary>
        FileStream GetFileStream(string fileName);

        /// <summary>
        /// Get file models
        /// </summary>
        IEnumerable<FileModel> GetFiles();

        /// <summary>
        /// Save posted files
        /// </summary>
        IEnumerable<FileModel> SaveFiles(HttpFileCollection files);

        /// <summary>
        /// Delete file
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns></returns>
        FileModel DeleteFile(string fileName);
    }
}
