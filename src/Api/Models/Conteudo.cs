using System;

namespace Api.Models
{
    public class Conteudo : IEquatable<Conteudo>
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

        public override string ToString() => $"{Id}: {Name} ({Provider})";

        // Métodos gerado pelo Scaffold
        public override bool Equals(object obj) => Equals(obj as Conteudo);
        public bool Equals(Conteudo other) => other != null && _expiresAt.Equals(other._expiresAt) && Id == other.Id && Name == other.Name && Duration == other.Duration && Provider == other.Provider && MediaType == other.MediaType && ExpiresAt == other.ExpiresAt && Watched == other.Watched && Expired == other.Expired;

        public override int GetHashCode()
        {
            var hash = new HashCode();
            hash.Add(_expiresAt);
            hash.Add(Id);
            hash.Add(Name);
            hash.Add(Duration);
            hash.Add(Provider);
            hash.Add(MediaType);
            hash.Add(ExpiresAt);
            hash.Add(Watched);
            hash.Add(Expired);
            return hash.ToHashCode();
        }
    }
}
