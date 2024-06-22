using System.Text.Json.Serialization;

namespace OnsharpBowling2.Models
{
    public class PlayerModel
    {
        [JsonPropertyName("name")]
        public required string Name { get; set; }

        [JsonPropertyName("game")]
        public GameDetailsModel? Game { get; set; } = null;
    }
}
