using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://localhost:5000");

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:5174")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();

    if (!db.Songs.Any())
    {
        db.Songs.AddRange(
            new Song
            {
                Title = "Midnight City",
                Artist = "M83",
                Genre = "Synthpop",
                DurationInSeconds = 240,
                Year = 2008,
                IsFavorite = true
            },
            new Song
            {
                Title = "Bohemian Rhapsody",
                Artist = "Queen",
                Genre = "Rock",
                DurationInSeconds = 355,
                Year = 1975,
                IsFavorite = true
            },
            new Song
            {
                Title = "Levitating",
                Artist = "Dua Lipa",
                Genre = "Pop",
                DurationInSeconds = 203,
                Year = 2020,
                IsFavorite = false
            }
        );

        db.SaveChanges();
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.UseAuthorization();
app.MapControllers();

app.Run();