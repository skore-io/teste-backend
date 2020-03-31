using System.Collections.Generic;
using System.Threading.Tasks;

using Api.Features.Contents;
using Api.Models;

using AutoFixture.Xunit2;

using FluentAssertions;

using Xunit;

namespace Unit.Api.Features.Contents
{
    public class ListTests
    {
        [Theory, AutoData]
        public async Task Handle(List query, Conteudo esperado, [Frozen] ICollection<Conteudo> conteudos, ListHandler subject)
        {
            // Arrange
            conteudos.Add(esperado);

            // Act
            var result = await subject.Handle(query, default);

            // Assert
            result.Should().BeEquivalentTo(conteudos);
        }
    }
}
