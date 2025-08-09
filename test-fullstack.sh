#!/bin/bash

echo "🚀 Full-Stack Testing Script - 모두의 권리"
echo "=========================================="

# Check if services are running
echo "🔍 Checking if services are running..."

# Check backend
if curl -s http://localhost:3001 > /dev/null; then
    echo "✅ Backend is running on http://localhost:3001"
else
    echo "❌ Backend is not running on http://localhost:3001"
    echo "   Please start the backend first: cd backend && npm run start:dev"
    exit 1
fi

# Check frontend
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Frontend is running on http://localhost:3000"
else
    echo "❌ Frontend is not running on http://localhost:3000"
    echo "   Please start the frontend first: cd frontend && npm run dev"
    exit 1
fi

echo ""
echo "🎯 Testing Authentication..."
echo "============================"

# Test authentication endpoint
echo "Testing login endpoint..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"customer@test.com","password":"password123"}')

if echo "$LOGIN_RESPONSE" | grep -q "access_token"; then
    echo "✅ Authentication endpoint working"
    TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"access_token":"[^"]*"' | cut -d'"' -f4)
    echo "   Token received: ${TOKEN:0:20}..."
else
    echo "❌ Authentication failed"
    echo "   Response: $LOGIN_RESPONSE"
fi

echo ""
echo "📊 Testing API Endpoints..."
echo "==========================="

# Test quotations endpoint
if [ ! -z "$TOKEN" ]; then
    echo "Testing quotations endpoint..."
    QUOTATIONS_RESPONSE=$(curl -s -X GET http://localhost:3001/quotations \
      -H "Authorization: Bearer $TOKEN")
    
    if echo "$QUOTATIONS_RESPONSE" | grep -q "title"; then
        echo "✅ Quotations endpoint working"
    else
        echo "❌ Quotations endpoint failed"
    fi

    # Test consultations endpoint
    echo "Testing consultations endpoint..."
    CONSULTATIONS_RESPONSE=$(curl -s -X GET http://localhost:3001/consultations \
      -H "Authorization: Bearer $TOKEN")
    
    if echo "$CONSULTATIONS_RESPONSE" | grep -q "title"; then
        echo "✅ Consultations endpoint working"
    else
        echo "❌ Consultations endpoint failed"
    fi

    # Test profile endpoint
    echo "Testing profile endpoint..."
    PROFILE_RESPONSE=$(curl -s -X GET http://localhost:3001/users/profile \
      -H "Authorization: Bearer $TOKEN")
    
    if echo "$PROFILE_RESPONSE" | grep -q "email"; then
        echo "✅ Profile endpoint working"
    else
        echo "❌ Profile endpoint failed"
    fi
else
    echo "⚠️  Skipping API tests (no valid token)"
fi

echo ""
echo "🎨 Frontend Testing..."
echo "====================="

# Check if frontend pages are accessible
echo "Testing frontend pages..."

# Test login page
if curl -s http://localhost:3000/login | grep -q "모두의 관리"; then
    echo "✅ Login page accessible"
else
    echo "❌ Login page not accessible"
fi

echo ""
echo "📋 Manual Testing Checklist"
echo "==========================="
echo ""
echo "Please manually test the following:"
echo ""
echo "1. 🔐 Authentication:"
echo "   - Open http://localhost:3000 in your browser"
echo "   - Login with customer@test.com / password123"
echo "   - Verify redirect to home page"
echo ""
echo "2. 🏠 Home Page:"
echo "   - Check if welcome message is displayed"
echo "   - Verify service grid has 9 services"
echo "   - Test quick access cards"
echo ""
echo "3. 📄 Quotations Page:"
echo "   - Navigate to /quotations"
echo "   - Check if existing quotations are displayed"
echo "   - Test creating new quotation"
echo "   - Test deleting quotation"
echo ""
echo "4. 💬 Consultations Page:"
echo "   - Navigate to /consultations"
echo "   - Check if existing consultations are displayed"
echo "   - Test creating new consultation"
echo "   - Test deleting consultation"
echo ""
echo "5. 👤 Profile Page:"
echo "   - Navigate to /profile"
echo "   - Check if user information is displayed"
echo "   - Test editing profile information"
echo ""
echo "6. 📱 Mobile Testing:"
echo "   - Open Developer Tools (F12)"
echo "   - Toggle Device Toolbar"
echo "   - Test responsive design on mobile"
echo ""
echo "🎉 Testing Complete!"
echo ""
echo "If all manual tests pass, your full-stack application is working correctly!"
echo ""
echo "Next steps:"
echo "1. Create demo video (follow DEMO_VIDEO_SCRIPT.md)"
echo "2. Deploy to production (follow README.md)"
echo "3. Prepare for assessment submission" 