using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SongsController : ControllerBase
{
    private readonly AppDbContext _context;

    public SongsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Song>>> GetSongs()
    {
        return await _context.Songs.OrderBy(song => song.Title).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Song>> GetSong(int id)
    {
        var song = await _context.Songs.FindAsync(id);

        if (song is null)
        {
            return NotFound();
        }

        return song;
    }

    [HttpPost]
    public async Task<ActionResult<Song>> CreateSong(Song song)
    {
        _context.Songs.Add(song);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSong), new { id = song.Id }, song);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSong(int id, Song song)
    {
        if (id != song.Id)
        {
            return BadRequest();
        }

        var existingSong = await _context.Songs.FindAsync(id);

        if (existingSong is null)
        {
            return NotFound();
        }

        existingSong.Title = song.Title;
        existingSong.Artist = song.Artist;
        existingSong.Genre = song.Genre;
        existingSong.DurationInSeconds = song.DurationInSeconds;
        existingSong.Year = song.Year;
        existingSong.IsFavorite = song.IsFavorite;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSong(int id)
    {
        var song = await _context.Songs.FindAsync(id);

        if (song is null)
        {
            return NotFound();
        }

        _context.Songs.Remove(song);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}