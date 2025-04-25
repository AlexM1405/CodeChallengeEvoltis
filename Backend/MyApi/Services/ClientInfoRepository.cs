
using Clients.API.DbContexts;
using Clients.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace Clients.API.Repositories
{
    public class ClientInfoRepository : IClientInfoRepository
    {
        private readonly ClientInfoContext _context;

        public ClientInfoRepository(ClientInfoContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Client>> GetClientsAsync()
        {
            return await _context.Clients.ToListAsync();
        }

        public async Task<Client> GetClientByIdAsync(int id)
        {
            return await _context.Clients.FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Client> CreateClientAsync(Client client)
        {
            _context.Clients.Add(client);
            await _context.SaveChangesAsync();
            return client;
        }

        public async Task<bool> UpdateClientAsync(Client client)
        {
            _context.Clients.Update(client);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteClientAsync(int id)
        {
            var client = await _context.Clients.FindAsync(id);
            if (client == null) return false;

            _context.Clients.Remove(client);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}