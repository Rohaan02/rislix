import 'reflect-metadata';
import { Ignitor, prettyPrintError } from '@adonisjs/core';
const APP_ROOT = new URL('../', import.meta.url);
const IMPORTER = (filePath) => {
    if (filePath.startsWith('./') || filePath.startsWith('../')) {
        return import(`${APP_ROOT.href}/${filePath}`);
    }
    return import(filePath);
};
new Ignitor(APP_ROOT, { importer: IMPORTER })
    .tap((app) => {
    app.listen('SIGTERM', () => app.terminate());
    app.listenIf(app.managedByPm2, 'SIGINT', () => app.terminate());
})
    .ace()
    .handle(process.argv.slice(2))
    .catch(prettyPrintError);
//# sourceMappingURL=console.js.map