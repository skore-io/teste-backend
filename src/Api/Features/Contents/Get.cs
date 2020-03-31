using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using Api.Models;

using MediatR;

using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Contents
{
    public class Get : IRequest<Conteudo>
    {
        [FromRoute(Name = "id")]
        public int Id { get; set; }
    }

    public class GetHandler : IRequestHandler<Get, Conteudo>
    {
        private readonly ICollection<Conteudo> _conteudos;

        public GetHandler(ICollection<Conteudo> conteudos)
        {
            _conteudos = conteudos ?? throw new ArgumentNullException(nameof(conteudos));
        }

        public Task<Conteudo> Handle(Get request, CancellationToken cancellationToken)
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

            conteudo.Watched = true;

            return Task.FromResult(conteudo);
        }
    }
}
