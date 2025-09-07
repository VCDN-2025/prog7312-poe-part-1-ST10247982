using System.Text.Json;
using System.Text.Json.Serialization;

namespace UrbanSync.Server.DataStructures {
    public class SimpleListJsonConverter:JsonConverterFactory {
        public override bool CanConvert(Type typeToConvert) {
            return typeToConvert.IsGenericType &&
                   typeToConvert.GetGenericTypeDefinition() == typeof(SimpleList<>);
        }

        public override JsonConverter CreateConverter(Type typeToConvert, JsonSerializerOptions options) {
            Type elementType = typeToConvert.GetGenericArguments()[0];
            Type converterType = typeof(SimpleListJsonConverter<>).MakeGenericType(elementType);
            return (JsonConverter)Activator.CreateInstance(converterType)!;
        }
    }

    public class SimpleListJsonConverter<T> : JsonConverter<SimpleList<T>> {
        public override SimpleList<T> Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options) {
            // Deserialize as a normal list first
            var list = JsonSerializer.Deserialize<List<T>>(ref reader, options);

            var simpleList = new SimpleList<T>();
            if (list != null) {
                foreach (var item in list) {
                    simpleList.Add(item);
                }
            }
            return simpleList;
        }

        public override void Write(Utf8JsonWriter writer, SimpleList<T> value, JsonSerializerOptions options) {
            writer.WriteStartArray();
            foreach (var item in value) {
                JsonSerializer.Serialize(writer, item, options);
            }
            writer.WriteEndArray();
        }
    }
}
