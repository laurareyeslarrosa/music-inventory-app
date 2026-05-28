namespace backend.Models;

public class Song
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Artist { get; set; } = string.Empty;

    public string Genre { get; set; } = string.Empty;

    public int DurationInSeconds { get; set; }

    public int Year { get; set; }

    public bool IsFavorite { get; set; }
}