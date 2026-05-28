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
        return await _context.Songs.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Song>> CreateSong(Song song)
    {
        _context.Songs.Add(song);

        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetSongs),
            new { id = song.Id },
            song
        );
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSong(int id)
    {
        var song = await _context.Songs.FindAsync(id);

        if (song == null)
        {
            return NotFound();
        }

        _context.Songs.Remove(song);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}