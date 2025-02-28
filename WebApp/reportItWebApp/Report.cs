using System.Text.Json.Serialization;

namespace reportItWebApp
{
    public class Report
    {
        public string ID {  get; set; }
        public string Address { get; set; }
        public string Description {  get; set; }
        public string Category{  get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Status {  get; set; }
        public string ReporterEmail { get; set; }
        public string PhotoURL { get; set; }
        public string HandlerEmail { get; set; }
        
        [JsonConverter(typeof(FirestoreTimestampConverter))]
        public DateTimeOffset SubmissionDate {  get; set; }
    }
}