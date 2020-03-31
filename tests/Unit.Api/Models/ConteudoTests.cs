using System;

using Api.Models;

using AutoFixture.Xunit2;

using FluentAssertions;

using Xunit;

namespace Unit.Api.Models
{
    public class ConteudoTests
    {
        [Theory, AutoData]
        public void ExpiresAt_Getter(Conteudo subject)
        {
            // Arrange

            // Act
            long result = subject.ExpiresAt;

            // Assert
            result.Should().NotBe(default);
        }

        [Theory, AutoData]
        public void ExpiresAt_Setter(DateTimeOffset dthTeste, Conteudo subject)
        {
            // Arrange

            // Act
            subject.ExpiresAt = dthTeste.ToUnixTimeSeconds();

            // Assert
            subject.ExpiresAt.Should().Be(dthTeste.ToUnixTimeSeconds());
        }

        [Theory, AutoData]
        public void Expired(DateTimeOffset dthTeste)
        {
            // Arrange
            bool expected = dthTeste < DateTimeOffset.Now;
            var subject = new Conteudo { ExpiresAt = dthTeste.ToUnixTimeSeconds() };

            // Act
            bool result = subject.Expired;

            // Assert
            result.Should().Be(expected);
        }
    }
}
