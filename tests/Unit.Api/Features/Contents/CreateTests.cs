using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Api.Features.Contents;
using Api.Models;

using AutoFixture.Xunit2;

using FluentAssertions;

using Xunit;

namespace Unit.Api.Features.Contents
{
    public class CreateTests
    {
        [Theory, AutoData]
        public async Task Handle(Create command, CreateHandler subject)
        {
            // Arrange

            // Act
            var result = await subject.Handle(command, default);

            // Assert
            result
                .Should()
                .NotBeNull().And
                .BeOfType<Conteudo>().And
                .BeEquivalentTo(result);
        }

        [Theory, AutoData]
        public async Task Handle_Existing_ThrowsInvalidOperation(Conteudo conteudo, [Frozen] ICollection<Conteudo> conteudos, CreateHandler subject)
        {
            // Arrange
            conteudos.Clear();
            conteudos.Add(conteudo);
            var command = new Create { Id = conteudo.Id };

            // Act
            Func<Task> act = async () => await subject.Handle(command, default);

            // Assert
            await act.Should().ThrowAsync<InvalidOperationException>();
        }
    }
}
