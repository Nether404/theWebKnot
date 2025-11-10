// vite.config.ts
import path from "path";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
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
    // Gzip compression for better mobile performance
    compression({
      include: /\.(js|css|html|svg|json)$/,
      threshold: 1024,
      // Only compress files larger than 1KB
      deleteOriginFile: false
    }),
    // Brotli compression for modern browsers
    compression({
      include: /\.(js|css|html|svg|json)$/,
      algorithm: "brotliCompress",
      threshold: 1024,
      deleteOriginFile: false
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInO1xuaW1wb3J0IHsgY29tcHJlc3Npb24gfSBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbjInO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICB2aXN1YWxpemVyKHtcbiAgICAgIGZpbGVuYW1lOiAnLi9kaXN0L3N0YXRzLmh0bWwnLFxuICAgICAgb3BlbjogZmFsc2UsXG4gICAgICBnemlwU2l6ZTogdHJ1ZSxcbiAgICAgIGJyb3RsaVNpemU6IHRydWUsXG4gICAgfSksXG4gICAgLy8gR3ppcCBjb21wcmVzc2lvbiBmb3IgYmV0dGVyIG1vYmlsZSBwZXJmb3JtYW5jZVxuICAgIGNvbXByZXNzaW9uKHtcbiAgICAgIGluY2x1ZGU6IC9cXC4oanN8Y3NzfGh0bWx8c3ZnfGpzb24pJC8sXG4gICAgICB0aHJlc2hvbGQ6IDEwMjQsIC8vIE9ubHkgY29tcHJlc3MgZmlsZXMgbGFyZ2VyIHRoYW4gMUtCXG4gICAgICBkZWxldGVPcmlnaW5GaWxlOiBmYWxzZSxcbiAgICB9KSxcbiAgICAvLyBCcm90bGkgY29tcHJlc3Npb24gZm9yIG1vZGVybiBicm93c2Vyc1xuICAgIGNvbXByZXNzaW9uKHtcbiAgICAgIGluY2x1ZGU6IC9cXC4oanN8Y3NzfGh0bWx8c3ZnfGpzb24pJC8sXG4gICAgICBhbGdvcml0aG06ICdicm90bGlDb21wcmVzcycgYXMgYW55LFxuICAgICAgdGhyZXNob2xkOiAxMDI0LFxuICAgICAgZGVsZXRlT3JpZ2luRmlsZTogZmFsc2UsXG4gICAgfSksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICB9LFxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBleGNsdWRlOiBbJ2x1Y2lkZS1yZWFjdCddLFxuICB9LFxuICBidWlsZDoge1xuICAgIC8vIERpc2FibGUgc291cmNlbWFwcyBpbiBwcm9kdWN0aW9uIGZvciBzbWFsbGVyIGJ1bmRsZSBzaXplXG4gICAgc291cmNlbWFwOiBmYWxzZSxcblxuICAgIC8vIFVzZSB0ZXJzZXIgZm9yIG1pbmlmaWNhdGlvbiB3aXRoIG9wdGltaXplZCBzZXR0aW5nc1xuICAgIG1pbmlmeTogJ3RlcnNlcicsXG4gICAgdGVyc2VyT3B0aW9uczoge1xuICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgLy8gUmVtb3ZlIGNvbnNvbGUubG9nIHN0YXRlbWVudHMgaW4gcHJvZHVjdGlvblxuICAgICAgICBkcm9wX2NvbnNvbGU6IHRydWUsXG4gICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWUsXG4gICAgICAgIC8vIEFkZGl0aW9uYWwgY29tcHJlc3Npb24gb3B0aW9ucyBmb3IgbW9iaWxlXG4gICAgICAgIHBhc3NlczogMixcbiAgICAgICAgcHVyZV9mdW5jczogWydjb25zb2xlLmxvZycsICdjb25zb2xlLmluZm8nLCAnY29uc29sZS5kZWJ1ZyddLFxuICAgICAgfSxcbiAgICAgIG1hbmdsZToge1xuICAgICAgICBzYWZhcmkxMDogdHJ1ZSwgLy8gRml4IFNhZmFyaSAxMCBpc3N1ZXNcbiAgICAgIH0sXG4gICAgICBmb3JtYXQ6IHtcbiAgICAgICAgY29tbWVudHM6IGZhbHNlLCAvLyBSZW1vdmUgYWxsIGNvbW1lbnRzXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICAvLyBUYXJnZXQgbW9kZXJuIGJyb3dzZXJzIGZvciBzbWFsbGVyIGJ1bmRsZVxuICAgIHRhcmdldDogJ2VzMjAyMCcsXG5cbiAgICAvLyBPcHRpbWl6ZSBDU1NcbiAgICBjc3NDb2RlU3BsaXQ6IHRydWUsXG4gICAgY3NzTWluaWZ5OiB0cnVlLFxuXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIC8vIE9wdGltaXplIGNodW5rIG5hbWluZyBmb3IgYmV0dGVyIGNhY2hpbmdcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdhc3NldHMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXS1baGFzaF0uanMnLFxuICAgICAgICBhc3NldEZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdLltleHRdJyxcbiAgICAgICAgXG4gICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgIC8vIENvcmUgUmVhY3QgbGlicmFyaWVzIC0gc3RhYmxlLCBjYWNoZWFibGUgY2h1bmtcbiAgICAgICAgICAncmVhY3QtdmVuZG9yJzogWydyZWFjdCcsICdyZWFjdC1kb20nLCAncmVhY3Qtcm91dGVyLWRvbSddLFxuXG4gICAgICAgICAgLy8gUmFkaXggVUkgY29tcG9uZW50cyAtIHNlcGFyYXRlIGNodW5rIGZvciBVSSBwcmltaXRpdmVzXG4gICAgICAgICAgJ3JhZGl4LXVpJzogW1xuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1hY2NvcmRpb24nLFxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1hbGVydC1kaWFsb2cnLFxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1hc3BlY3QtcmF0aW8nLFxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1hdmF0YXInLFxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1jaGVja2JveCcsXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LWNvbGxhcHNpYmxlJyxcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtY29udGV4dC1tZW51JyxcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtZGlhbG9nJyxcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtZHJvcGRvd24tbWVudScsXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LWhvdmVyLWNhcmQnLFxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1sYWJlbCcsXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LW1lbnViYXInLFxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1uYXZpZ2F0aW9uLW1lbnUnLFxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1wb3BvdmVyJyxcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtcHJvZ3Jlc3MnLFxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1yYWRpby1ncm91cCcsXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LXNjcm9sbC1hcmVhJyxcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3Qtc2VsZWN0JyxcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3Qtc2VwYXJhdG9yJyxcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3Qtc2xpZGVyJyxcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3Qtc2xvdCcsXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LXN3aXRjaCcsXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LXRhYnMnLFxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC10b2FzdCcsXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LXRvZ2dsZScsXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LXRvZ2dsZS1ncm91cCcsXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LXRvb2x0aXAnLFxuICAgICAgICAgIF0sXG5cbiAgICAgICAgICAvLyAzRCBsaWJyYXJpZXMgLSB1c2VkIGJ5IHJlYWN0LWJpdHMgY29tcG9uZW50cyAobGF6eSBsb2FkKVxuICAgICAgICAgICd0aHJlZS12ZW5kb3InOiBbXG4gICAgICAgICAgICAndGhyZWUnLFxuICAgICAgICAgICAgJ0ByZWFjdC10aHJlZS9maWJlcicsXG4gICAgICAgICAgICAnQHJlYWN0LXRocmVlL2RyZWknLFxuICAgICAgICAgICAgJ0ByZWFjdC10aHJlZS9wb3N0cHJvY2Vzc2luZycsXG4gICAgICAgICAgICAncG9zdHByb2Nlc3NpbmcnLFxuICAgICAgICAgIF0sXG5cbiAgICAgICAgICAvLyBBbmltYXRpb24gbGlicmFyaWVzIC0gdXNlZCBieSByZWFjdC1iaXRzIGNvbXBvbmVudHNcbiAgICAgICAgICAnYW5pbWF0aW9uLXZlbmRvcic6IFsnZ3NhcCcsICdtb3Rpb24nXSxcblxuICAgICAgICAgIC8vIFJlYWN0LUJpdHMgV2ViR0wgZGVwZW5kZW5jaWVzXG4gICAgICAgICAgJ3JlYWN0LWJpdHMtZGVwcyc6IFsnb2dsJ10sXG5cbiAgICAgICAgICAvLyBGb3JtIGxpYnJhcmllcyAtIHJlYWR5IGZvciByZWFjdC1ob29rLWZvcm0gaW50ZWdyYXRpb25cbiAgICAgICAgICAnZm9ybS12ZW5kb3InOiBbJ3pvZCddLCAvLyBXaWxsIGluY2x1ZGUgcmVhY3QtaG9vay1mb3JtLCBAaG9va2Zvcm0vcmVzb2x2ZXJzIHdoZW4gYWRkZWRcblxuICAgICAgICAgIC8vIFV0aWxpdHkgbGlicmFyaWVzXG4gICAgICAgICAgdXRpbHM6IFsnY2xzeCcsICd0YWlsd2luZC1tZXJnZScsICdjbGFzcy12YXJpYW5jZS1hdXRob3JpdHknXSxcbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIC8vIE9wdGltaXplIGNodW5rIHNpemVcbiAgICAgICAgY29tcGFjdDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIC8vIFJlZHVjZSBjaHVuayBzaXplIHdhcm5pbmcgbGltaXQgZm9yIG1vYmlsZSBvcHRpbWl6YXRpb25cbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDUwMCxcbiAgICBcbiAgICAvLyBPcHRpbWl6ZSBhc3NldCBpbmxpbmluZ1xuICAgIGFzc2V0c0lubGluZUxpbWl0OiA0MDk2LCAvLyBJbmxpbmUgYXNzZXRzIHNtYWxsZXIgdGhhbiA0S0JcbiAgfSxcbiAgXG4gIC8vIE9wdGltaXplIHNlcnZlciBmb3IgZGV2ZWxvcG1lbnRcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogNTE3MyxcbiAgICBzdHJpY3RQb3J0OiBmYWxzZSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixPQUFPLFVBQVU7QUFDMU8sT0FBTyxXQUFXO0FBQ2xCLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsa0JBQWtCO0FBQzNCLFNBQVMsbUJBQW1CO0FBSjVCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFdBQVc7QUFBQSxNQUNULFVBQVU7QUFBQSxNQUNWLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLFlBQVk7QUFBQSxJQUNkLENBQUM7QUFBQTtBQUFBLElBRUQsWUFBWTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBO0FBQUEsTUFDWCxrQkFBa0I7QUFBQSxJQUNwQixDQUFDO0FBQUE7QUFBQSxJQUVELFlBQVk7QUFBQSxNQUNWLFNBQVM7QUFBQSxNQUNULFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxNQUNYLGtCQUFrQjtBQUFBLElBQ3BCLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsY0FBYztBQUFBLEVBQzFCO0FBQUEsRUFDQSxPQUFPO0FBQUE7QUFBQSxJQUVMLFdBQVc7QUFBQTtBQUFBLElBR1gsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBO0FBQUEsUUFFUixjQUFjO0FBQUEsUUFDZCxlQUFlO0FBQUE7QUFBQSxRQUVmLFFBQVE7QUFBQSxRQUNSLFlBQVksQ0FBQyxlQUFlLGdCQUFnQixlQUFlO0FBQUEsTUFDN0Q7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLFVBQVU7QUFBQTtBQUFBLE1BQ1o7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLFVBQVU7QUFBQTtBQUFBLE1BQ1o7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUdBLFFBQVE7QUFBQTtBQUFBLElBR1IsY0FBYztBQUFBLElBQ2QsV0FBVztBQUFBLElBRVgsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBO0FBQUEsUUFFTixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxRQUVoQixjQUFjO0FBQUE7QUFBQSxVQUVaLGdCQUFnQixDQUFDLFNBQVMsYUFBYSxrQkFBa0I7QUFBQTtBQUFBLFVBR3pELFlBQVk7QUFBQSxZQUNWO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUE7QUFBQSxVQUdBLGdCQUFnQjtBQUFBLFlBQ2Q7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBO0FBQUEsVUFHQSxvQkFBb0IsQ0FBQyxRQUFRLFFBQVE7QUFBQTtBQUFBLFVBR3JDLG1CQUFtQixDQUFDLEtBQUs7QUFBQTtBQUFBLFVBR3pCLGVBQWUsQ0FBQyxLQUFLO0FBQUE7QUFBQTtBQUFBLFVBR3JCLE9BQU8sQ0FBQyxRQUFRLGtCQUFrQiwwQkFBMEI7QUFBQSxRQUM5RDtBQUFBO0FBQUEsUUFHQSxTQUFTO0FBQUEsTUFDWDtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBR0EsdUJBQXVCO0FBQUE7QUFBQSxJQUd2QixtQkFBbUI7QUFBQTtBQUFBLEVBQ3JCO0FBQUE7QUFBQSxFQUdBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxFQUNkO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
