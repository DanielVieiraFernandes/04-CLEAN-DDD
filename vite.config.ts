import {defineConfig} from "vite"
import tsConfigPaths from "vitest-tsconfig-paths";
export default defineConfig({
    plugins: [tsConfigPaths()],
    test:{
        globals: true
    }
})