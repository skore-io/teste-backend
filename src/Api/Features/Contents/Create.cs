using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using Api.Models;

using FluentValidation;

using MediatR;

namespace Api.Features.Contents
{
    public class Create : IRequest<Conteudo>
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int Duration { get; set; }

        public string Provider { get; set; }

        public string MediaType { get; set; }

        public string ProviderId { get; set; }

        public long ExpiresAt { get; set; }
    }

    public class CreateValidator : AbstractValidator<Create>
    {
        public CreateValidator()
        {
            RuleFor(c => c.Id).NotNull();
            RuleFor(c => c.Name).NotEmpty();
            RuleFor(c => c.Duration).GreaterThanOrEqualTo(0);
            RuleFor(c => c.Provider).NotEmpty();
            RuleFor(c => c.MediaType).NotEmpty();
            RuleFor(c => c.ProviderId).NotEmpty();
            RuleFor(c => c.ExpiresAt).NotNull().GreaterThanOrEqualTo(0);
        }
    }

    public class CreateHandler : IRequestHandler<Create, Conteudo>
    {
        private readonly ICollection<Conteudo> _conteudos;

        public CreateHandler(ICollection<Conteudo> conteudos)
        {
            _conteudos = conteudos ?? throw new ArgumentNullException(nameof(conteudos));
        }

        public Task<Conteudo> Handle(Create request, CancellationToken cancellationToken)
        {
            if (request is null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            if (_conteudos.Any(c => c.Id == request.Id))
            {
                throw new InvalidOperationException($"Um conteúdo com o id {request.Id} já existe");
            }

            var novoConteudo = new Conteudo
            {
                Id = request.Id,
                Name = request.Name,
                Duration = request.Duration,
                Provider = request.Provider,
                ProviderId = request.ProviderId,
                ExpiresAt = request.ExpiresAt
            };

            _conteudos.Add(novoConteudo);

            return Task.FromResult(novoConteudo);
        }
    }
}
