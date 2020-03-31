using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using Api.Models;

using MediatR;

namespace Api.Features.Contents
{
	/// <summary>
	/// Query para listar todos os Conteúdos.
	/// </summary>
	public class List : IRequest<IEnumerable<Conteudo>> { }

	public class ListHandler : IRequestHandler<List, IEnumerable<Conteudo>>
	{
		private readonly ICollection<Conteudo> _collection;

		public ListHandler(ICollection<Conteudo> collection)
		{
			_collection = collection ?? throw new ArgumentNullException(nameof(collection));
		}

		public Task<IEnumerable<Conteudo>> Handle(List request, CancellationToken cancellationToken)
		{
			if (request is null)
			{
				throw new ArgumentNullException(nameof(request));
			}

			return Task.FromResult(_collection.AsEnumerable());
		}
	}
}
