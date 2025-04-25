using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

namespace Clients.API.Controllers
{
    [Route("api/authentication")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AuthenticationController(IConfiguration configuration)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        public class AuthenticationRequestBody
        {
            public string? UserName { get; set; }
            public string? Password { get; set; }
        }

        private class ProductInfoUser
        {
            public int UserId { get; }
            public string UserName { get; }
            public string FirstName { get; }
            public string LastName { get; }
            public string City { get; }

            public ProductInfoUser(int userId, string userName, string firstName, string lastName, string city)
            {
                UserId = userId;
                UserName = userName;
                FirstName = firstName;
                LastName = lastName;
                City = city;
            }
        }

        [HttpPost("authenticate")]
        public ActionResult<string> Authenticate(AuthenticationRequestBody authenticationRequestBody)
        {
            if (authenticationRequestBody is null || 
                string.IsNullOrWhiteSpace(authenticationRequestBody.UserName) || 
                string.IsNullOrWhiteSpace(authenticationRequestBody.Password))
            {
                return BadRequest("Username and password must be provided.");
            }

            var user = ValidateUserCredentials(authenticationRequestBody.UserName, authenticationRequestBody.Password);

            if (user == null)
            {
                return Unauthorized("Invalid credentials.");
            }

            try
            {
                var tokenToReturn = GenerateToken(user);
                return Ok(tokenToReturn);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Token generation failed: {ex.Message}");
            }
        }

        private ProductInfoUser? ValidateUserCredentials(string? userName, string? password)
        {
            // Aquí debes conectar con tu base de datos para validar credenciales
            if (userName == "testuser" && password == "password123")
            {
                return new ProductInfoUser(
                    1,
                    userName,
                    "Dante",
                    "Arrighi",
                    "Rosario"
                );
            }

            return null;
        }

        private string GenerateToken(ProductInfoUser user)
        {
            var secretKey = _configuration["Authentication:SecretForKey"];
            if (string.IsNullOrWhiteSpace(secretKey))
            {
                throw new Exception("Secret key is not configured.");
            }

            var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKey));
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim("sub", user.UserId.ToString()),
                new Claim("given_name", user.FirstName),
                new Claim("family_name", user.LastName),
                new Claim("city", user.City),
                new Claim("role", "User") 
            };

            var jwtSecurityToken = new JwtSecurityToken(
                _configuration["Authentication:Issuer"],
                _configuration["Authentication:Audience"],
                claims,
                DateTime.UtcNow,
                DateTime.UtcNow.AddHours(1),
                signingCredentials
            );

            return new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
        }
    }
}