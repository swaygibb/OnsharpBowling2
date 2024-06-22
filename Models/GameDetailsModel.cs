using System.Text.Json.Serialization;

namespace OnsharpBowling2.Models
{
    public class GameDetailsModel
    {
        [JsonPropertyName("frame1")]
        public FrameModel? Frame1 { get; set; }

        [JsonPropertyName("frame2")]
        public FrameModel? Frame2 { get; set; }

        [JsonPropertyName("frame3")]
        public FrameModel? Frame3 { get; set; }

        [JsonPropertyName("frame4")]
        public FrameModel? Frame4 { get; set; }

        [JsonPropertyName("frame5")]
        public FrameModel? Frame5 { get; set; }

        [JsonPropertyName("frame6")]
        public FrameModel? Frame6 { get; set; }

        [JsonPropertyName("frame7")]
        public FrameModel? Frame7 { get; set; }

        [JsonPropertyName("frame8")]
        public FrameModel? Frame8 { get; set; }

        [JsonPropertyName("frame9")]
        public FrameModel? Frame9 { get; set; }

        [JsonPropertyName("frame10")]
        public FrameModel? Frame10 { get; set; }

        [JsonPropertyName("player_active")]
        public bool PlayerActive { get; set; }

        [JsonPropertyName("grand_total")]
        public int GrandTotal { get; set; }
    }
}
