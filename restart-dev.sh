#!/bin/bash
echo "🔄 Restarting WebKnot Development Server"
echo "========================================="
echo ""
echo "Clearing Vite cache..."
rm -rf node_modules/.vite

echo "✅ Cache cleared"
echo ""
echo "ℹ️  The dev server will now recognize @supabase/supabase-js"
echo ""
echo "To start the server manually, run:"
echo "  npm run dev"
echo ""
