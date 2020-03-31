using System.Collections.Generic;
using System.Threading.Tasks;

using Api.Features.Contents;
using Api.Models;

using AutoFixture.Xunit2;

using FluentAssertions;

using Xunit;

namespace Unit.Api.Features.Contents
{
    public class GetTests
    {
        [Theory, AutoData]
        public async Task Handle(Conteudo esperado, [Frozen] ICollection<Conteudo> conteudos, GetHandler subject)
        {
            // Arrange
            conteudos.Add(esperado);

            // Act
            var result = await subject.Handle(new Get { Id = esperado.Id }, default);

            // Assert
            result.Should().BeEquivalentTo(esperado);
        }

        [Theory, AutoData]
        public async Task Handle_ChangesWatched([Frozen] ICollection<Conteudo> conteudos, GetHandler subject)
        {
            // Arrange
            conteudos.Add(new Conteudo { Id = 1, Watched = false });

            // Act
            var result = await subject.Handle(new Get { Id = 1 }, default);

            // Assert
            result.Should()
                .BeOfType<Conteudo>()
                .Which.Watched.Should()
                    .BeTrue();
        }
    }
}
