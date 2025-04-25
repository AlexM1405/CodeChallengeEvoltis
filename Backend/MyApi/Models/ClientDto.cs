public class Client
{
    public int Id { get; set; }
    public string Name { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string Phone { get; set; } = default!;
    public string Address { get; set; } = default!;
    public string? Status { get; set; }
    public int Rating { get; set; }
    public string? Notes { get; set; }

    public Client() { }

    public Client(string name, string lastName)
    {
        Name = name;
        LastName = lastName;
    }
}
