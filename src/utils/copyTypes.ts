import path from 'path';
import fs from 'fs';

type CopyConfig = {
    strapiFolder: string;
    destinationFolder: string;
};

type FilesConfig = {
    src: string;
    dest: string;
};

export const copyStrapiTypes = ({ strapiFolder, destinationFolder }: CopyConfig) => {
    const currentPath = process.cwd();

    const files: FilesConfig[] = [
        {
            src: path.join(currentPath, strapiFolder, '/types/generated/contentTypes.d.ts'),
            dest: path.join(currentPath, destinationFolder, 'contentTypes.d.ts'),
        },
        {
            src: path.join(currentPath, strapiFolder, '/types/generated/components.d.ts'),
            dest: path.join(currentPath, strapiFolder, '/components.d.ts'),
        },
    ];

    const copyFile = ({ src, dest }: FilesConfig) => {
        const destinationDir = path.dirname(dest);

        if (!fs.existsSync(src)) {
            console.error(`Source file does not exist: ${src}`);
            process.exit(1);
        }

        if (!fs.existsSync(destinationDir)) {
            fs.mkdirSync(destinationDir, { recursive: true });
        }

        const content = fs.readFileSync(src, 'utf8');

        fs.writeFile(dest, content, err => {
            if (err) {
                console.error(`Error writing to destination file: ${err}`);
                process.exit(1);
            } else {
                console.log(`File ${src} copied and modified successfully!`);
            }
        });
    };

    files.forEach(file => {
        copyFile(file);
    });
};
