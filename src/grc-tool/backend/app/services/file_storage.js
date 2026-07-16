import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import app from '@adonisjs/core/services/app';
const UPLOAD_DIR = 'storage/uploads';
export async function storeUploadedFile(file, subfolder) {
    const dir = join(app.makePath(UPLOAD_DIR), subfolder);
    await mkdir(dir, { recursive: true });
    const ext = file.extname ?? '';
    const filename = `${randomUUID()}${ext}`;
    const dest = join(dir, filename);
    if (!file.tmpPath)
        throw new Error('Upload temp path missing');
    const { readFile } = await import('node:fs/promises');
    const buffer = await readFile(file.tmpPath);
    await writeFile(dest, buffer);
    return `/uploads/${subfolder}/${filename}`;
}
export function scanFilePlaceholder(_path) {
    return true;
}
//# sourceMappingURL=file_storage.js.map