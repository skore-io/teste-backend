using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using MediatR;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Api.Features.Contents
{
    [Route("/api/[controller]")]
    public class ContentsController : ControllerBase
    {
        private readonly ILogger<ContentsController> _logger;
        private readonly IMediator _mediator;

        public ContentsController(ILogger<ContentsController> logger, IMediator mediator)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpGet]
        public async Task<IActionResult> ListConteudos()
        {
            try
            {
                var result = await _mediator.Send(new List());
                _logger.LogDebug("Conteudos recuperados: {@Conteudo}", result);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro inesperado ao consultar conteúdos");
                throw;
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetConteudo([FromRoute] Get query)
        {
            try
            {
                var result = await _mediator.Send(query);
                _logger.LogDebug("Conteúdo recuperado : {@Conteudo}", result);
                return Ok(result);
            }
            catch (KeyNotFoundException)
            {
                _logger.LogDebug("Conteúdo não encontrado para a consulta {@Request}", query);
                return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro inesperado ao consultar conteúdo {@Request}", query);
                throw;
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateConteudo([FromBody] Create command)
        {
            try
            {
                var result = await _mediator.Send(command);
                _logger.LogDebug("Conteúdo criado: {@Conteudo}", result);
                return Created(string.Empty, result);
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogDebug(ex, "Operação inválida: {@Command}", command);
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro inesperado ao criar conteúdo {@Command}", command);
                throw;
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateConteudo([FromBody] Update command)
        {
            try
            {
                var result = await _mediator.Send(command);
                _logger.LogDebug("Conteúdo atualizado com valores: {@Command}", command);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                _logger.LogDebug("Conteúdo não encontrado para atualização {@Command}", command);
                return NotFound();
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogDebug(ex, "Operação inválida: {@Command}", command);
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro inesperado ao criar conteúdo {@Command}", command);
                throw;
            }
        }
    }
}
