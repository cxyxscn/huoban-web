import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import {VantResolver} from '@vant/auto-import-resolver';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [VantResolver()],
        }),
        Components({
            resolvers: [VantResolver()],
        }),
    ],
    css: {
        // css预处理器
        preprocessorOptions: {
            less: {
                charset: false,
            },
        },
    },
    server: {
        host: '0.0.0.0',
        port: 8080, //设置服务启动端口号，是一个可选项，不要设置为本机的端口号，可能会发生冲突
        open: true, //是否自动打开浏览器，可选项
        cors: true, //允许跨域。
        // 设置代理
        proxy: {
            // 将请求代理到另一个服务器
            '/api': {
                target: 'http://localhost:8090/api',//这是你要跨域请求的地址前缀
                changeOrigin: true,//开启跨域
                rewrite: path => path.replace(/^\/api/, ''),//去除前缀api
            }
        }
    }
})
