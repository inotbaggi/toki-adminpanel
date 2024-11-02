const path = require('path');
const WebpackObfuscator = require('webpack-obfuscator');

module.exports = {
    mode: 'production', // Убедитесь, что режим установлен на production
    entry: './src/index.tsx', // Ваш основной файл
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader', // Используйте ts-loader для TypeScript
                exclude: /node_modules/,
            },
            // Добавьте здесь правила для обработки CSS и Tailwind
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new WebpackObfuscator({
            rotateStringArray: true,
            // Добавьте другие опции, если нужно
        }, ['excluded_bundle_name.js']), // Исключите файлы, которые не нужно обфусцировать
    ],
};
