using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

using Api.Features.Contents;
using Api.Models;

using AutoFixture.Xunit2;

using FluentAssertions;

using MediatR;

using Microsoft.AspNetCore.Mvc;

using Moq;

using Unit.Api.Attributes;

using Xunit;

namespace Unit.Api.Features.Contents
{
    public class ContentsControllerTests
    {
        [Theory, AutoMoqData]
        public async Task List(IEnumerable<Conteudo> expected, [Frozen] Mock<IMediator> mediator, ContentsController subject)
        {
            // Arrange
            _ = mediator
                .Setup(m => m.Send(It.IsAny<List>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(expected);

            // Act
            var result = await subject.ListConteudos();

            // Assert
            result.Should()
                .BeAssignableTo<IActionResult>().And
                .BeOfType<OkObjectResult>().Which
                .Value.Should().BeEquivalentTo(expected);
        }

        [Theory, AutoMoqData]
        public async Task GetConteudo(Get query, Conteudo expected, [Frozen] Mock<IMediator> mediator, ContentsController subject)
        {
            // Arrange
            _ = mediator
                .Setup(m => m.Send(query, It.IsAny<CancellationToken>()))
                .ReturnsAsync(expected);

            // Act
            var result = await subject.GetConteudo(query);

            // Assert
            result.Should()
                .BeAssignableTo<IActionResult>().And
                .BeOfType<OkObjectResult>().Which
                .Value.Should().BeEquivalentTo(expected);
        }

        [Theory, AutoMoqData]
        public async Task CreateConteudo(Create command, Conteudo expected, [Frozen] Mock<IMediator> mediator, ContentsController subject)
        {
            // Arrange
            _ = mediator
                .Setup(m => m.Send(command, It.IsAny<CancellationToken>()))
                .ReturnsAsync(expected);

            // Act
            var result = await subject.CreateConteudo(command);

            // Assert
            result.Should()
                .BeAssignableTo<IActionResult>().And
                .BeOfType<CreatedResult>().Which
                .Value.Should().BeEquivalentTo(expected);
        }

        [Theory, AutoMoqData]
        public async Task UpdateConteudo(Update command, ContentsController subject)
        {
            // Arrange

            // Act
            var result = await subject.UpdateConteudo(command);

            // Assert
            result.Should()
                .BeAssignableTo<IActionResult>().And
                .BeOfType<NoContentResult>();
        }
    }
}
