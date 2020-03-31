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
    public class UpdateTests
    {
        [Theory, AutoData]
        public async Task Handle(Update command, [Frozen] ICollection<Conteudo> conteudos, UpdateHandler subject)
        {
            // Arrange
            conteudos.Add(new Conteudo { Id = command.Id });

            // Act
            var result = await subject.Handle(command, default);

            // Assert
            result.Should().NotBeNull();
        }

        [Theory, AutoData]
        public async Task Handle_NaoExistente_KeyNotFound(Update command, UpdateHandler subject)
        {
            // Arrange

            // Act
            Func<Task> act = async () => await subject.Handle(command, default);

            // Assert
            await act.Should().ThrowAsync<KeyNotFoundException>();
        }
    }
}
