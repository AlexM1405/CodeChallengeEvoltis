using Clients.API.Entities;
using Clients.API.Models;
using Clients.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace Clients.API.Controllers
{
    [ApiController]
    [Route("api/clients")]
    public class ClientsController : ControllerBase
    {
        private readonly IClientInfoService _clientInfoService;

        public ClientsController(IClientInfoService clientInfoService)
        {
            _clientInfoService = clientInfoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClientDto>>> GetClients()
        {
            var clients = await _clientInfoService.GetClientsAsync();
            var clientDtos = clients.Select(c => new ClientDto
            {
                Id = c.Id,
                Name = c.Name,
                Email = c.Email,
                PhoneNumber = c.PhoneNumber,
                Status = c.Status ?? "Unknown"
            });

            return Ok(clientDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ClientDto>> GetClient(int id)
        {
            var client = await _clientInfoService.GetClientByIdAsync(id);
            if (client == null) return NotFound();

            var clientDto = new ClientDto
            {
                Id = client.Id,
                Name = client.Name,
                Email = client.Email,
                PhoneNumber = client.PhoneNumber,
                Status = client.Status
            };

            return Ok(clientDto);
        }

        [HttpPost]
        public async Task<ActionResult<ClientDto>> CreateClient(ClientForCreationDto clientForCreate)
        {
            var client = new Client
            {
                Name = clientForCreate.Name,
                Email = clientForCreate.Email,
                PhoneNumber = clientForCreate.PhoneNumber,
                Status = clientForCreate.Status
            };

            var createdClient = await _clientInfoService.CreateClientAsync(client);

            var clientDto = new ClientDto
            {
                Id = createdClient.Id,
                Name = createdClient.Name,
                Email = createdClient.Email,
                PhoneNumber = createdClient.PhoneNumber,
                Status = createdClient.Status
            };

            return CreatedAtAction(nameof(GetClient), new { id = createdClient.Id }, clientDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateClient(int id, ClientForUpdateDto clientForUpdate)
        {
            var client = await _clientInfoService.GetClientByIdAsync(id);
            if (client == null) return NotFound();

            client.Name = clientForUpdate.Name;
            client.Email = clientForUpdate.Email;
            client.PhoneNumber = clientForUpdate.PhoneNumber;
            client.Status = clientForUpdate.Status;

            var success = await _clientInfoService.UpdateClientAsync(client);
            if (!success) return BadRequest();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteClient(int id)
        {
            var success = await _clientInfoService.DeleteClientAsync(id);
            if (!success) return NotFound();

            return NoContent();
        }
    }
}