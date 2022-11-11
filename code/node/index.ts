import fs from 'fs';
import path from 'path';

/**
 * @description 是否是文件夹
 * @param path
 * @returns { Boolean }
 */
function isDirectory(path: string): Boolean {
    return fs.statSync(path).isDirectory();
}

/**
 * @description 是否是文件
 * @param path
 * @returns { Boolean }
 */
function isFile(path: string): Boolean {
    return fs.statSync(path).isFile();
}

/**
 * @description 获取所有文件夹
 * @param cwd
 * @returns { Array<{fullpath: string;dirname: string;}> }
 */
function getDirs(cwd: string = process.cwd()): Array<{ fullpath: string; dirname: string }> {
    const dirs = fs.readdirSync(cwd);
    return dirs.reduce((result, dir) => {
        if (isDirectory(path.join(cwd, dir))) {
            result.push({
                fullpath: path.join(cwd, dir),
                dirname: dir
            });
        }
        return result;
    }, [] as Array<{ fullpath: string; dirname: string }>);
}

/**
 * @description 获取所有文件
 * @param cwd
 * @returns { Array<{fullpath: string;filename: string;}> }
 */
function getFiles(cwd: string = process.cwd()): Array<{ fullpath: string; filename: string }> {
    const dirs = fs.readdirSync(cwd);
    return dirs.reduce((result, dir) => {
        if (isFile(path.join(cwd, dir))) {
            result.push({
                fullpath: path.join(cwd, dir),
                filename: dir
            });
        }
        return result;
    }, [] as Array<{ fullpath: string; filename: string }>);
}

/**
 * @description 获取所有的文件以及文件夹
 * @param cwd
 * @returns
 */
function getDirsAndFiles(cwd: string = process.cwd()): {
    files: Array<{ fullpath: string; filename: string }>;
    dirs: Array<{ fullpath: string; dirname: string }>;
} {
    const dirs = fs.readdirSync(cwd);
    return dirs.reduce(
        (result, dir) => {
            if (isFile(path.join(cwd, dir))) {
                result.files = [...result.files, { fullpath: path.join(cwd, dir), filename: dir }];
            }
            if (isDirectory(path.join(cwd, dir))) {
                result.dirs = [...result.dirs, { fullpath: path.join(cwd, dir), dirname: dir }];
            }
            return result;
        },
        { files: [], dirs: [] } as {
            files: Array<{ fullpath: string; filename: string }>;
            dirs: Array<{ fullpath: string; dirname: string }>;
        }
    );
}

