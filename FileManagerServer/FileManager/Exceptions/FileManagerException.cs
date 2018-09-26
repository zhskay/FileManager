using System;
using System.Runtime.Serialization;

namespace FileManager.Exceptions
{
    public class FileManagerException : Exception
    {
        public FileManagerException(string message) : base(message)
        { }

        public FileManagerException(string message, Exception innerException) : base(message, innerException)
        { }

        protected FileManagerException(SerializationInfo info, StreamingContext context) : base(info, context)
        { }
    }
}