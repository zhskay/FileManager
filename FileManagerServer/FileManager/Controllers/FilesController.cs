using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using FileManager.Exceptions;
using FileManager.Models;
using FileManager.Services;

namespace FileManager.Controllers
{
    [RoutePrefix("api/v1/files")]
    public class FilesController : ApiController
    {
        private readonly IFilesService _filesService;

        public FilesController(IFilesService filesService)
        {
            _filesService = filesService;
        }

        [HttpGet]
        [Route("")]
        [ResponseType(typeof(FileModel[]))]
        public IHttpActionResult GetFiles()
        {
            var files = _filesService.GetFiles();

            return Ok(files);
        }

        [HttpGet]
        [Route("{fileName}")]
        public IHttpActionResult GetFile(string fileName)
        {
            FileStream fileStream;
            try
            {
                fileStream = _filesService.GetFileStream(fileName);
            }
            catch (FileManagerException ex)
            {
                return BadRequest(ex.Message);
            }

            return Stream(fileName, fileStream);
        }

        [HttpPost]
        [Route("")]
        [ResponseType(typeof(FileModel[]))]
        public IHttpActionResult PostFiles()
        {
            if (HttpContext.Current.Request.Files.Count == 0)
            {
                return BadRequest();
            }

            var models = _filesService.SaveFiles(HttpContext.Current.Request.Files);

            return Ok(models);
        }

        [HttpDelete]
        [Route("")]
        [ResponseType(typeof(FileModel))]
        public IHttpActionResult DeleteFile(string name)
        {
            FileModel deleted;
            try
            {
                deleted = _filesService.DeleteFile(name);
            }
            catch (FileManagerException ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(deleted);
        }

        /// <summary>
        /// Creates response message with 200 status code and stream content
        /// </summary>
        private IHttpActionResult Stream(string fileName, Stream fileStream)
        {
            var result = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StreamContent(fileStream)
            };
            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
            {
                FileName = fileName
            };
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");

            return ResponseMessage(result);
        }
    }
}
