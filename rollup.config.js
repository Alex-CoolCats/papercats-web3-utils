import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import json from "@rollup/plugin-json";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.tsx",
    output: [
      {
        dir: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        dir: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss(),
      terser(),
      json()
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ dir: "dist", format: "esm" }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/],
  },
];