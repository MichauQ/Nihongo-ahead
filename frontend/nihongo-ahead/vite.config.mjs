import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@babel/runtime/helpers/extends": path.resolve(__dirname, "./node_modules/@babel/runtime/helpers/esm/extends.js"),
      "@babel/runtime/helpers/inheritsLoose": path.resolve(__dirname, "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js"),
    },
  },
});
