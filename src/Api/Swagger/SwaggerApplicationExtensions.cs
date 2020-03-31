using System;

namespace Microsoft.AspNetCore.Builder
{
    public static class SwaggerApplicationExtensions
    {
        public static IApplicationBuilder UseSwaggerGenAndUi(this IApplicationBuilder app)
        {
            if (app is null)
            {
                throw new ArgumentNullException(nameof(app));
            }

            app
                .UseSwagger()
                .UseSwaggerUI(c =>
                {
                    c.RoutePrefix = string.Empty;
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Teste Backend API");
                });

            return app;
        }
    }
}
