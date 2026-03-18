using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddNewtonsoftJson(options => 
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:5173", "http://localhost:4000")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    try
    {
        context.Database.Migrate();

        if (!context.Teams.Any())
        {
            var teams = new List<Team> {
                new Team { Name = "Real Madrid CF", City = "Madrid", FoundedYear = 1902 },
                new Team { Name = "FC Barcelona", City = "Barcelona", FoundedYear = 1899 },
                new Team { Name = "Atlético de Madrid", City = "Madrid", FoundedYear = 1903 },
                new Team { Name = "Real Sociedad", City = "San Sebastián", FoundedYear = 1909 },
                new Team { Name = "Athletic Club", City = "Bilbao", FoundedYear = 1898 }
            };
            context.Teams.AddRange(teams);
            context.SaveChanges();

            // Madrid
            var madrid = teams[0];
            context.Players.AddRange(
                new Player { Name = "Kylian Mbappé", Position = "Delantero", Number = 9, TeamId = madrid.Id },
                new Player { Name = "Vinícius Júnior", Position = "Extremo Izquierdo", Number = 7, TeamId = madrid.Id },
                new Player { Name = "Jude Bellingham", Position = "Mediocentro", Number = 5, TeamId = madrid.Id }
            );
            context.CoachingStaffs.Add(new CoachingStaff { Name = "Carlo Ancelotti", Role = "Entrenador Principal", TeamId = madrid.Id });

            // Barca
            var barca = teams[1];
            context.Players.AddRange(
                new Player { Name = "Robert Lewandowski", Position = "Delantero", Number = 9, TeamId = barca.Id },
                new Player { Name = "Lamine Yamal", Position = "Extremo Derecho", Number = 19, TeamId = barca.Id },
                new Player { Name = "Pedri", Position = "Centrocampista", Number = 8, TeamId = barca.Id }
            );
            context.CoachingStaffs.Add(new CoachingStaff { Name = "Hansi Flick", Role = "Entrenador Principal", TeamId = barca.Id });

            // Atleti
            var atleti = teams[2];
            context.Players.AddRange(
                new Player { Name = "Antoine Griezmann", Position = "Delantero", Number = 7, TeamId = atleti.Id },
                new Player { Name = "Julián Álvarez", Position = "Delantero", Number = 19, TeamId = atleti.Id },
                new Player { Name = "Koke", Position = "Centrocampista", Number = 6, TeamId = atleti.Id }
            );
            context.CoachingStaffs.Add(new CoachingStaff { Name = "Diego Simeone", Role = "Entrenador Principal", TeamId = atleti.Id });

            // La Real
            var rsoc = teams[3];
            context.Players.AddRange(
                new Player { Name = "Takefusa Kubo", Position = "Extremo", Number = 14, TeamId = rsoc.Id },
                new Player { Name = "Mikel Oyarzabal", Position = "Delantero", Number = 10, TeamId = rsoc.Id }
            );
            context.CoachingStaffs.Add(new CoachingStaff { Name = "Imanol Alguacil", Role = "Entrenador Principal", TeamId = rsoc.Id });

            // Athletic
            var athletic = teams[4];
            context.Players.AddRange(
                new Player { Name = "Nico Williams", Position = "Extremo", Number = 11, TeamId = athletic.Id },
                new Player { Name = "Iñaki Williams", Position = "Delantero", Number = 9, TeamId = athletic.Id }
            );
            context.CoachingStaffs.Add(new CoachingStaff { Name = "Ernesto Valverde", Role = "Entrenador Principal", TeamId = athletic.Id });

            context.SaveChanges();
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error during Seeding: {ex.Message}");
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowSpecificOrigin");
app.UseAuthorization();
app.MapControllers();

app.Run();
