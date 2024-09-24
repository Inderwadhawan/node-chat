declare module 'swagger-ui-express' {
    import { Router } from 'express';
    import { OpenAPIV3 } from 'openapi-types';
  
    interface SwaggerUiOptions {
      explorer?: boolean;
      swaggerOptions?: {
        [key: string]: any;
      };
      customCss?: string;
      customJs?: string;
      customfavIcon?: string;
      customSiteTitle?: string;
    }
  
    function serve(req: any, res: any, next: any): void;
    function setup(
      swaggerDoc: OpenAPIV3.Document,
      options?: SwaggerUiOptions
    ): Router;
  
    export { serve, setup };
  }
  