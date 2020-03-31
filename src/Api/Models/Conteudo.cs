using System;

namespace Api.Models
{
    public class Conteudo
    {
        private DateTimeOffset _expiresAt;

        public int Id { get; set; }

        public string Name { get; set; }

        public int Duration { get; set; }

        public string Provider { get; set; }

        public string MediaType { get; set; }

        public long ExpiresAt
        {
            get => _expiresAt.ToUnixTimeSeconds();
            set => _expiresAt = DateTimeOffset.FromUnixTimeSeconds(value);
        }

        public bool Watched { get; set; } = false;

        public bool Expired => ExpiresAt < DateTimeOffset.Now.ToUnixTimeSeconds();
    }
}
