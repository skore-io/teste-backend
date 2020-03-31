using System;

using Microsoft.OpenApi.Models;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class SwaggerServicesExtensions
    {
        public static IServiceCollection AddSwaggerGeneration(this IServiceCollection services)
        {
            if (services is null)
            {
                throw new ArgumentNullException(nameof(services));
            }

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "SkoreIO Teste Backend",
                    Contact = new OpenApiContact { Name = "Rodolpho Alves", Email = "rodolpho.castro.a@gmail.com", Url = new Uri(@"https://rodolphocastro.github.io/#/") },
                    Description = "API para teste do backend"
                });
            });

            return services;
        }
    }
}
