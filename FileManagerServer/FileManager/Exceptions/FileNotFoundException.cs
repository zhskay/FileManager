using System;
using System.Runtime.Serialization;

namespace FileManager.Exceptions
{
    public class FileNotFoundException : FileManagerException
    {
        public FileNotFoundException() : base("Файл не найден")
        { }

        public FileNotFoundException(Exception innerException) : base("Файл не найден", innerException)
        { }

        public FileNotFoundException(SerializationInfo info, StreamingContext context) : base(info, context)
        { }
    }
}