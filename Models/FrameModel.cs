using System.Text.Json.Serialization;

namespace OnsharpBowling2.Models
{
    public class FrameModel
    {
        [JsonPropertyName("score1")]
        public object? Score1 { get; set; }

        [JsonPropertyName("score2")]
        public object? Score2 { get; set; }

        [JsonPropertyName("score3")]
        public object? Score3 { get; set; } = null;

        [JsonPropertyName("total")]
        public object? Total { get; set; }

        [JsonPropertyName("active1")]
        public bool Active1 { get; set; }

        [JsonPropertyName("active2")]
        public bool Active2 { get; set; }

        [JsonPropertyName("active3")]
        public bool? Active3 { get; set; } = null;
    }
}
