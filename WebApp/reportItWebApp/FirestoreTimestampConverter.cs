using System.Text.Json;
using System.Text.Json.Serialization;

namespace reportItWebApp
{
    public class FirestoreTimestampConverter : JsonConverter<DateTimeOffset>
    {
        public override DateTimeOffset Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if(reader.TokenType == JsonTokenType.String)
            {
                // Handles standard ISO 8601 string timestamps
                return DateTimeOffset.Parse(reader.GetString()).ToUniversalTime();
            }
            else if(reader.TokenType == JsonTokenType.StartObject)
            {
                int? seconds = null;
                int? nanoseconds = null;

                while(reader.Read())
                {
                    if(reader.TokenType == JsonTokenType.EndObject)
                    {
                        break;
                    }

                    if(reader.TokenType == JsonTokenType.PropertyName)
                    {
                        string propertyName = reader.GetString();
                        reader.Read();

                        // Firestore uses "_seconds" and "_nanoseconds"
                        if(propertyName == "_seconds")
                        {
                            seconds = reader.GetInt32();
                        }

                        if(propertyName == "_nanoseconds")
                        {
                            nanoseconds = reader.GetInt32();
                        }
                    }
                }

                if(seconds.HasValue)
                {
                    return DateTimeOffset.FromUnixTimeSeconds(seconds.Value).ToUniversalTime();
                }
            }

            throw new JsonException("Unexpected Firestore timestamp format.");
        }

        public override void Write(Utf8JsonWriter writer, DateTimeOffset value, JsonSerializerOptions options)
        {
            writer.WriteStartObject();
            writer.WriteNumber("_seconds", value.ToUnixTimeSeconds());
            writer.WriteNumber("_nanoseconds", 0);
            writer.WriteEndObject();
        }
    }

}