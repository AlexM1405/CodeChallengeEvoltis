using Clients.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace Clients.API.DbContexts
{
    public class ClientInfoContext : DbContext
    {
        public DbSet<Client> Clients { get; set; } = null!;

        public ClientInfoContext(DbContextOptions<ClientInfoContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Client>().HasData(
                new Client("Alejandro", "Mora")
                {
                    Id = 1,
                    Email = "alejandro@example.com",
                    Phone = "123456789",
                    Address = "Buenos Aires, Argentina",
                    Status = "Active",
                    Rating = 5,
                    Notes = "Important client"
                },
                new Client("Sofia", "Salva")
                {
                    Id = 2,
                    Email = "sofia@example.com",
                    Phone = "987654321",
                    Address = "Buenos Aires, Argentina",
                    Status = "Active",
                    Rating = 4,
                    Notes = "Needs follow-up"
                },
                new Client("Carlos", "Ramirez")
                {
                    Id = 3,
                    Email = "carlos@example.com",
                    Phone = "555123456",
                    Address = "Rosario, Argentina",
                    Status = "Inactive",
                    Rating = 3,
                    Notes = "No longer active"
                }
            );

            base.OnModelCreating(modelBuilder);
        }
    }
}