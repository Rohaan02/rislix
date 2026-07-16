import env from '#start/env';
import app from '@adonisjs/core/services/app';
import { defineConfig } from '@adonisjs/core/http';
export const appKey = env.get('APP_KEY');
export const http = defineConfig({
    allowMethodSpoofing: false,
    trustProxy: app.inProduction,
    subdomainOffset: 2,
    generateRequestId: false,
    etag: false,
    cookie: {
        path: '/',
        maxAge: '2h',
        httpOnly: true,
        secure: app.inProduction,
        sameSite: 'lax',
    },
});
//# sourceMappingURL=app.js.map