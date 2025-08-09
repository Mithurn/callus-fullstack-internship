#!/bin/bash

echo "🚀 Starting 모두의 권리 - Service Matching Platform"
echo ""

# Check if backend is already running
if pgrep -f "nest start" > /dev/null; then
    echo "✅ Backend is already running on http://localhost:3001"
else
    echo "🔧 Starting backend..."
    cd backend && npm run start:dev &
    sleep 5
    echo "✅ Backend started on http://localhost:3001"
fi

# Check if frontend is already running
if pgrep -f "next dev" > /dev/null; then
    echo "✅ Frontend is already running on http://localhost:3000"
else
    echo "🔧 Starting frontend..."
    cd frontend && npm run dev &
    sleep 5
    echo "✅ Frontend started on http://localhost:3000"
fi

echo ""
echo "🎉 Application is ready!"
echo "📱 Frontend: http://localhost:3000"
echo "🔌 Backend: http://localhost:3001"
echo ""
echo "🔑 Test Credentials:"
echo "   Customer: customer@test.com / password123"
echo "   Provider: provider@test.com / password123"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for user to stop
wait 