
using AutoMapper;
using Clients.API.Entities;
using Clients.API.Models;

namespace Clients.API.Profiles
{
    public class ClientProfile : Profile
    {
        public ClientProfile()
        {
            CreateMap<Client, ClientDto>().ReverseMap();
        }
    }
}