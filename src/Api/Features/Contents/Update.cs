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
    public class Update : IRequest
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int Duration { get; set; }

        public string Provider { get; set; }

        public string MediaType { get; set; }

        public string ProviderId { get; set; }

        public long ExpiresAt { get; set; }
    }

    public class UpdateValidator : AbstractValidator<Update>
    {
        public UpdateValidator()
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

    public class UpdateHandler : IRequestHandler<Update>
    {
        private readonly ICollection<Conteudo> _conteudos;

        public UpdateHandler(ICollection<Conteudo> conteudos)
        {
            _conteudos = conteudos ?? throw new ArgumentNullException(nameof(conteudos));
        }

        public Task<Unit> Handle(Update request, CancellationToken cancellationToken)
        {
            if (request is null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            var conteudo = _conteudos.SingleOrDefault(c => c.Id == request.Id);

            if (conteudo is null)
            {
                throw new KeyNotFoundException($"Conteúdo {request.Id} não encontrado");
            }

            conteudo.Name = request.Name;
            conteudo.Duration = request.Duration;
            conteudo.Provider = request.Provider;
            conteudo.ProviderId = request.ProviderId;
            conteudo.ExpiresAt = request.ExpiresAt;
            conteudo.Watched = false;

            return Unit.Task;
        }
    }
}
