using System;
using FileManager.Models.Enums;

namespace FileManager.Models
{
    public class FileModel
    {
        public string Name { get; set; }

        public FileType Type { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime LastModifiedDate { get; set; }
    }
}