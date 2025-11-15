// vite.config.ts
import path from "path";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.js";
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import { visualizer } from "file:///home/project/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { compression } from "file:///home/project/node_modules/vite-plugin-compression2/dist/index.mjs";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: "./dist/stats.html",
      open: false,
      gzipSize: true,
      brotliSize: true
    }),
    compression({
      include: /\.(js|css|html|svg|json)$/,
      threshold: 1024
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  optimizeDeps: {
    exclude: ["lucide-react"]
  },
  build: {
    // Disable sourcemaps in production for smaller bundle size
    sourcemap: false,
    // Use terser for minification with optimized settings
    minify: "terser",
    terserOptions: {
      compress: {
        // Remove console.log statements in production
        drop_console: true,
        drop_debugger: true,
        // Additional compression options for mobile
        passes: 2,
        pure_funcs: ["console.log", "console.info", "console.debug"]
      },
      mangle: {
        safari10: true
        // Fix Safari 10 issues
      },
      format: {
        comments: false
        // Remove all comments
      }
    },
    // Target modern browsers for smaller bundle
    target: "es2020",
    // Optimize CSS
    cssCodeSplit: true,
    cssMinify: true,
    rollupOptions: {
      output: {
        // Optimize chunk naming for better caching
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
        manualChunks: {
          // Core React libraries - stable, cacheable chunk
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          // Radix UI components - separate chunk for UI primitives
          "radix-ui": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-aspect-ratio",
            "@radix-ui/react-avatar",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-collapsible",
            "@radix-ui/react-context-menu",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-hover-card",
            "@radix-ui/react-label",
            "@radix-ui/react-menubar",
            "@radix-ui/react-navigation-menu",
            "@radix-ui/react-popover",
            "@radix-ui/react-progress",
            "@radix-ui/react-radio-group",
            "@radix-ui/react-scroll-area",
            "@radix-ui/react-select",
            "@radix-ui/react-separator",
            "@radix-ui/react-slider",
            "@radix-ui/react-slot",
            "@radix-ui/react-switch",
            "@radix-ui/react-tabs",
            "@radix-ui/react-toast",
            "@radix-ui/react-toggle",
            "@radix-ui/react-toggle-group",
            "@radix-ui/react-tooltip"
          ],
          // 3D libraries - used by react-bits components (lazy load)
          "three-vendor": [
            "three",
            "@react-three/fiber",
            "@react-three/drei",
            "@react-three/postprocessing",
            "postprocessing"
          ],
          // Animation libraries - used by react-bits components
          "animation-vendor": ["gsap", "motion"],
          // React-Bits WebGL dependencies
          "react-bits-deps": ["ogl"],
          // Form libraries - ready for react-hook-form integration
          "form-vendor": ["zod"],
          // Will include react-hook-form, @hookform/resolvers when added
          // Utility libraries
          utils: ["clsx", "tailwind-merge", "class-variance-authority"]
        },
        // Optimize chunk size
        compact: true
      }
    },
    // Reduce chunk size warning limit for mobile optimization
    chunkSizeWarningLimit: 500,
    // Optimize asset inlining
    assetsInlineLimit: 4096
    // Inline assets smaller than 4KB
  },
  // Optimize server for development
  server: {
    port: 5173,
    strictPort: false
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInO1xuaW1wb3J0IHsgY29tcHJlc3Npb24gfSBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbjInO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICB2aXN1YWxpemVyKHtcbiAgICAgIGZpbGVuYW1lOiAnLi9kaXN0L3N0YXRzLmh0bWwnLFxuICAgICAgb3BlbjogZmFsc2UsXG4gICAgICBnemlwU2l6ZTogdHJ1ZSxcbiAgICAgIGJyb3RsaVNpemU6IHRydWUsXG4gICAgfSksXG4gICAgY29tcHJlc3Npb24oe1xuICAgICAgaW5jbHVkZTogL1xcLihqc3xjc3N8aHRtbHxzdmd8anNvbikkLyxcbiAgICAgIHRocmVzaG9sZDogMTAyNCxcbiAgICB9KSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxuICAgIH0sXG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGV4Y2x1ZGU6IFsnbHVjaWRlLXJlYWN0J10sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgLy8gRGlzYWJsZSBzb3VyY2VtYXBzIGluIHByb2R1Y3Rpb24gZm9yIHNtYWxsZXIgYnVuZGxlIHNpemVcbiAgICBzb3VyY2VtYXA6IGZhbHNlLFxuXG4gICAgLy8gVXNlIHRlcnNlciBmb3IgbWluaWZpY2F0aW9uIHdpdGggb3B0aW1pemVkIHNldHRpbmdzXG4gICAgbWluaWZ5OiAndGVyc2VyJyxcbiAgICB0ZXJzZXJPcHRpb25zOiB7XG4gICAgICBjb21wcmVzczoge1xuICAgICAgICAvLyBSZW1vdmUgY29uc29sZS5sb2cgc3RhdGVtZW50cyBpbiBwcm9kdWN0aW9uXG4gICAgICAgIGRyb3BfY29uc29sZTogdHJ1ZSxcbiAgICAgICAgZHJvcF9kZWJ1Z2dlcjogdHJ1ZSxcbiAgICAgICAgLy8gQWRkaXRpb25hbCBjb21wcmVzc2lvbiBvcHRpb25zIGZvciBtb2JpbGVcbiAgICAgICAgcGFzc2VzOiAyLFxuICAgICAgICBwdXJlX2Z1bmNzOiBbJ2NvbnNvbGUubG9nJywgJ2NvbnNvbGUuaW5mbycsICdjb25zb2xlLmRlYnVnJ10sXG4gICAgICB9LFxuICAgICAgbWFuZ2xlOiB7XG4gICAgICAgIHNhZmFyaTEwOiB0cnVlLCAvLyBGaXggU2FmYXJpIDEwIGlzc3Vlc1xuICAgICAgfSxcbiAgICAgIGZvcm1hdDoge1xuICAgICAgICBjb21tZW50czogZmFsc2UsIC8vIFJlbW92ZSBhbGwgY29tbWVudHNcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIC8vIFRhcmdldCBtb2Rlcm4gYnJvd3NlcnMgZm9yIHNtYWxsZXIgYnVuZGxlXG4gICAgdGFyZ2V0OiAnZXMyMDIwJyxcblxuICAgIC8vIE9wdGltaXplIENTU1xuICAgIGNzc0NvZGVTcGxpdDogdHJ1ZSxcbiAgICBjc3NNaW5pZnk6IHRydWUsXG5cbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgLy8gT3B0aW1pemUgY2h1bmsgbmFtaW5nIGZvciBiZXR0ZXIgY2FjaGluZ1xuICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdhc3NldHMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXS1baGFzaF0uW2V4dF0nLFxuICAgICAgICBcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgLy8gQ29yZSBSZWFjdCBsaWJyYXJpZXMgLSBzdGFibGUsIGNhY2hlYWJsZSBjaHVua1xuICAgICAgICAgICdyZWFjdC12ZW5kb3InOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdyZWFjdC1yb3V0ZXItZG9tJ10sXG5cbiAgICAgICAgICAvLyBSYWRpeCBVSSBjb21wb25lbnRzIC0gc2VwYXJhdGUgY2h1bmsgZm9yIFVJIHByaW1pdGl2ZXNcbiAgICAgICAgICAncmFkaXgtdWknOiBbXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LWFjY29yZGlvbicsXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LWFsZXJ0LWRpYWxvZycsXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LWFzcGVjdC1yYXRpbycsXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LWF2YXRhcicsXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LWNoZWNrYm94JyxcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtY29sbGFwc2libGUnLFxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1jb250ZXh0LW1lbnUnLFxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1kaWFsb2cnLFxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1kcm9wZG93bi1tZW51JyxcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtaG92ZXItY2FyZCcsXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LWxhYmVsJyxcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtbWVudWJhcicsXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LW5hdmlnYXRpb24tbWVudScsXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LXBvcG92ZXInLFxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1wcm9ncmVzcycsXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LXJhZGlvLWdyb3VwJyxcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3Qtc2Nyb2xsLWFyZWEnLFxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1zZWxlY3QnLFxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1zZXBhcmF0b3InLFxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1zbGlkZXInLFxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1zbG90JyxcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3Qtc3dpdGNoJyxcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtdGFicycsXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LXRvYXN0JyxcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtdG9nZ2xlJyxcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtdG9nZ2xlLWdyb3VwJyxcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtdG9vbHRpcCcsXG4gICAgICAgICAgXSxcblxuICAgICAgICAgIC8vIDNEIGxpYnJhcmllcyAtIHVzZWQgYnkgcmVhY3QtYml0cyBjb21wb25lbnRzIChsYXp5IGxvYWQpXG4gICAgICAgICAgJ3RocmVlLXZlbmRvcic6IFtcbiAgICAgICAgICAgICd0aHJlZScsXG4gICAgICAgICAgICAnQHJlYWN0LXRocmVlL2ZpYmVyJyxcbiAgICAgICAgICAgICdAcmVhY3QtdGhyZWUvZHJlaScsXG4gICAgICAgICAgICAnQHJlYWN0LXRocmVlL3Bvc3Rwcm9jZXNzaW5nJyxcbiAgICAgICAgICAgICdwb3N0cHJvY2Vzc2luZycsXG4gICAgICAgICAgXSxcblxuICAgICAgICAgIC8vIEFuaW1hdGlvbiBsaWJyYXJpZXMgLSB1c2VkIGJ5IHJlYWN0LWJpdHMgY29tcG9uZW50c1xuICAgICAgICAgICdhbmltYXRpb24tdmVuZG9yJzogWydnc2FwJywgJ21vdGlvbiddLFxuXG4gICAgICAgICAgLy8gUmVhY3QtQml0cyBXZWJHTCBkZXBlbmRlbmNpZXNcbiAgICAgICAgICAncmVhY3QtYml0cy1kZXBzJzogWydvZ2wnXSxcblxuICAgICAgICAgIC8vIEZvcm0gbGlicmFyaWVzIC0gcmVhZHkgZm9yIHJlYWN0LWhvb2stZm9ybSBpbnRlZ3JhdGlvblxuICAgICAgICAgICdmb3JtLXZlbmRvcic6IFsnem9kJ10sIC8vIFdpbGwgaW5jbHVkZSByZWFjdC1ob29rLWZvcm0sIEBob29rZm9ybS9yZXNvbHZlcnMgd2hlbiBhZGRlZFxuXG4gICAgICAgICAgLy8gVXRpbGl0eSBsaWJyYXJpZXNcbiAgICAgICAgICB1dGlsczogWydjbHN4JywgJ3RhaWx3aW5kLW1lcmdlJywgJ2NsYXNzLXZhcmlhbmNlLWF1dGhvcml0eSddLFxuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgLy8gT3B0aW1pemUgY2h1bmsgc2l6ZVxuICAgICAgICBjb21wYWN0OiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgLy8gUmVkdWNlIGNodW5rIHNpemUgd2FybmluZyBsaW1pdCBmb3IgbW9iaWxlIG9wdGltaXphdGlvblxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogNTAwLFxuICAgIFxuICAgIC8vIE9wdGltaXplIGFzc2V0IGlubGluaW5nXG4gICAgYXNzZXRzSW5saW5lTGltaXQ6IDQwOTYsIC8vIElubGluZSBhc3NldHMgc21hbGxlciB0aGFuIDRLQlxuICB9LFxuICBcbiAgLy8gT3B0aW1pemUgc2VydmVyIGZvciBkZXZlbG9wbWVudFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiA1MTczLFxuICAgIHN0cmljdFBvcnQ6IGZhbHNlLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLE9BQU8sVUFBVTtBQUMxTyxPQUFPLFdBQVc7QUFDbEIsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxrQkFBa0I7QUFDM0IsU0FBUyxtQkFBbUI7QUFKNUIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sV0FBVztBQUFBLE1BQ1QsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLE1BQ1YsWUFBWTtBQUFBLElBQ2QsQ0FBQztBQUFBLElBQ0QsWUFBWTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLElBQ2IsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxjQUFjO0FBQUEsRUFDMUI7QUFBQSxFQUNBLE9BQU87QUFBQTtBQUFBLElBRUwsV0FBVztBQUFBO0FBQUEsSUFHWCxRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUE7QUFBQSxRQUVSLGNBQWM7QUFBQSxRQUNkLGVBQWU7QUFBQTtBQUFBLFFBRWYsUUFBUTtBQUFBLFFBQ1IsWUFBWSxDQUFDLGVBQWUsZ0JBQWdCLGVBQWU7QUFBQSxNQUM3RDtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ04sVUFBVTtBQUFBO0FBQUEsTUFDWjtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ04sVUFBVTtBQUFBO0FBQUEsTUFDWjtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBR0EsUUFBUTtBQUFBO0FBQUEsSUFHUixjQUFjO0FBQUEsSUFDZCxXQUFXO0FBQUEsSUFFWCxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUE7QUFBQSxRQUVOLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLFFBRWhCLGNBQWM7QUFBQTtBQUFBLFVBRVosZ0JBQWdCLENBQUMsU0FBUyxhQUFhLGtCQUFrQjtBQUFBO0FBQUEsVUFHekQsWUFBWTtBQUFBLFlBQ1Y7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQTtBQUFBLFVBR0EsZ0JBQWdCO0FBQUEsWUFDZDtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUE7QUFBQSxVQUdBLG9CQUFvQixDQUFDLFFBQVEsUUFBUTtBQUFBO0FBQUEsVUFHckMsbUJBQW1CLENBQUMsS0FBSztBQUFBO0FBQUEsVUFHekIsZUFBZSxDQUFDLEtBQUs7QUFBQTtBQUFBO0FBQUEsVUFHckIsT0FBTyxDQUFDLFFBQVEsa0JBQWtCLDBCQUEwQjtBQUFBLFFBQzlEO0FBQUE7QUFBQSxRQUdBLFNBQVM7QUFBQSxNQUNYO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFHQSx1QkFBdUI7QUFBQTtBQUFBLElBR3ZCLG1CQUFtQjtBQUFBO0FBQUEsRUFDckI7QUFBQTtBQUFBLEVBR0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLEVBQ2Q7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
