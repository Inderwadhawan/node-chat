import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express, { Application } from 'express';
import path from "path";
import * as dotenv from 'dotenv';
dotenv.config();

interface SecuritySchemeObject {
  type: 'http';
  scheme: 'bearer';
  bearerFormat: 'JWT';
}

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Chat',
    version: '1.0.0',
    description: 'This is chating App Api',
  },
  servers: [
    {
      url: process.env.SWAGGER_SERVER_URL || 'http://localhost:3000',
      description: process.env.SWAGGER_SERVER_DESCRIPTION || 'Local server',
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http' as 'http',       // Type should be 'http'
        scheme: 'bearer' as 'bearer', // Scheme should be 'bearer'
        bearerFormat: 'JWT',          // Optional: Specify the format of the token
      },
    },
  },
  paths: {},
};




const options = {
  definition: swaggerDefinition,  // Changed this line
  apis: [
    // './src/routes/*.ts',
    path.join(__dirname, `app/modules/auth/routes/v1/auth.js`),
    path.join(__dirname, `app/modules/chat/routes/v1/chat.js`),
    path.join(__dirname, `app/modules/userDetails/routes/v1/profile.js`),
    path.join(__dirname, `app/modules/userDetails/routes/v1/post.js`),
    path.join(__dirname, `app/modules/admin/auth/routes/v1/auth.js`),  
    path.join(__dirname, `app/modules/admin/auth/routes/v1/userRoutes.js`),  
    path.join(__dirname, `app/modules/admin/master/routes/v1/master.js`),
    path.join(__dirname, `app/modules/user/routes/v1/user.js`),
  ],
};

const swaggerSpec = swaggerJSDoc(options); 

const setupSwagger = (app: Application) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
