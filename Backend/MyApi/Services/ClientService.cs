using Clients.API.Repositories;
using Clients.API.Entities;

namespace Clients.API.Services
{
    public class ClientInfoService : IClientInfoService
    {
        private readonly IClientInfoRepository _repository;

        public ClientInfoService(IClientInfoRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Client>> GetClientsAsync()
        {
            return await _repository.GetClientsAsync();
        }

        public async Task<Client> GetClientByIdAsync(int id)
        {
            return await _repository.GetClientByIdAsync(id);
        }

        public async Task<Client> CreateClientAsync(Client client)
        {
            return await _repository.CreateClientAsync(client);
        }

        public async Task<bool> UpdateClientAsync(Client client)
        {
            return await _repository.UpdateClientAsync(client);
        }

        public async Task<bool> DeleteClientAsync(int id)
        {
            return await _repository.DeleteClientAsync(id);
        }
    }
}