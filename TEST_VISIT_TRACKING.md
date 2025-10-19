# Visit Tracking Integration - Testing & Debugging Guide

## 🔍 Key Improvements Made

### 1. **Fixed Issues:**
- ✅ Changed from `http://` to `https://` for the API URL
- ✅ Added proper CORS configuration (`mode: 'cors'`)
- ✅ **Fixed Content Security Policy (CSP)** - Added API domain to `connectSrc`
- ✅ Added 1-second delay for initial page load tracking
- ✅ Added debouncing to prevent duplicate calls
- ✅ **Fixed duplicate visit tracking** - Added multiple safeguards:
  - Prevents initialization from running multiple times
  - Prevents initial page load from being tracked twice
  - Prevents duplicate API calls within 2 seconds for same URL
  - Prevents hash change and popstate events during initial load
- ✅ **Environment detection** - Only tracks visits in PRODUCTION mode:
  - Skips API calls on localhost, 127.0.0.1, 192.168.x.x
  - Only makes API calls on production domains (nexusplater.up.railway.app)
- ✅ Improved error handling with try-catch blocks
- ✅ Added more metadata (screen resolution, language, etc.)
- ✅ Removed link click tracking to prevent excessive API calls

### 2. **Debug Mode:**
To enable debugging and see what's happening:

**In `main.js`, change line 768:**
```javascript
const DEBUG_MODE = false; // Change to true
```

**To:**
```javascript
const DEBUG_MODE = true; // Enable debugging
```

### 3. **Environment Detection:**
The visit tracking automatically detects the environment:

- **DEVELOPMENT** (localhost, 127.0.0.1, 192.168.x.x, *.local) - API calls are SKIPPED
- **PRODUCTION** (nexusplater.up.railway.app or custom domain) - API calls are MADE

This prevents cluttering your analytics with development/testing visits.

### 4. **What Gets Tracked:**

#### **Events (PRODUCTION ONLY):**
- ✅ Initial page load (after 1 second)
- ✅ Hash changes (e.g., `#catalog`, `#about`, `#contact`)
- ✅ Browser back/forward button clicks

#### **Data Sent:**
```json
{
  "sourceSystemConst": "NEXUS_WEBSITE",
  "sessionId": "sess_1704987654321_abc123xyz",
  "metadata": {
    "pageUrl": "http://localhost:5000/",
    "pagePath": "/",
    "pageHash": "#catalog",
    "referrer": "direct",
    "timestamp": "2025-10-12T10:30:00.000Z",
    "userAgent": "Mozilla/5.0...",
    "screenResolution": "1920x1080",
    "language": "en-US"
  }
}
```

## 🧪 Testing Instructions

### **1. Enable Debug Mode**
Open `public/js/main.js` and set:
```javascript
const DEBUG_MODE = true;
```

### **2. Test the Application**
1. Open your browser
2. Navigate to `http://localhost:5000`
3. Open Developer Tools (F12)
4. Go to Console tab
5. With DEBUG_MODE enabled, you should see:
   ```
   [Visit Tracking] Environment: DEVELOPMENT
   [Visit Tracking] Hostname: localhost
   [Visit Tracking] Initializing visit tracking...
   [Visit Tracking] Skipping visit tracking in DEVELOPMENT mode
   ```

**Note:** API calls are NOT made in development mode. You'll only see tracking happen on production domains.

### **3. Test Navigation**
1. Click on navigation links (Catalog, About, Contact)
2. Watch the console - in development mode, tracking is skipped
3. In production, each hash change will trigger a new visit record

### **4. Check Session Storage**
In Developer Tools Console, run:
```javascript
sessionStorage.getItem('nexus_session_id')
sessionStorage.getItem('last_visit_id')
sessionStorage.getItem('last_visit_time')
```

## 🔧 Troubleshooting

### **Problem: CSP Error - "Refused to connect"**

**Error Message:**
```
Fetch API cannot load https://apigateway.up.railway.app/v1/visits. 
Refused to connect because it violates the document's Content Security Policy.
```

**Solution: Already Fixed!**
The `src/security.js` file has been updated to allow connections to the API:
```javascript
connectSrc: [
  "'self'",
  "https://apigateway.up.railway.app" // Visit tracking API allowed
]
```

**If you still see this error:**
1. Restart the Node.js server
2. Clear browser cache (Ctrl+Shift+Delete)
3. Do a hard refresh (Ctrl+F5)

### **Problem: No API calls in Network tab**

**Solution 1: Check CORS**
- The API must allow CORS from your domain
- Check browser console for CORS errors

**Solution 2: Verify API URL**
Test the API directly:
```bash
curl -X POST https://apigateway.up.railway.app/v1/visits \
  -H "Content-Type: application/json" \
  -d '{"sourceSystemConst":"NEXUS_WEBSITE"}'
```

### **Problem: Visits not showing in API**

**Solution: Enable Debug Mode**
1. Set `DEBUG_MODE = true` in main.js
2. Reload the page
3. Check console for error messages
4. Look for HTTP status codes

### **Problem: Too many API calls / Duplicate visits**

**Solution: Multiple safeguards enabled**
- Hash changes are debounced (500ms delay)
- Initial load has 1-second delay
- Prevents initialization from running multiple times
- Prevents initial load from being tracked twice
- Prevents duplicate API calls within 2 seconds for same URL
- Skips hash change and popstate events during initial load
- Only hash changes and popstate events trigger tracking after initial load

## 📊 Verifying Data

### **Check if visits are being recorded:**

1. **Get all visits from your website:**
   ```bash
   curl https://apigateway.up.railway.app/v1/visits/source/NEXUS_WEBSITE \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

2. **Get visit statistics:**
   ```bash
   curl https://apigateway.up.railway.app/v1/visits/statistics \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

3. **Get visits by source system:**
   ```bash
   curl https://apigateway.up.railway.app/v1/visits/by-source-system \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

## ✅ Expected Behavior

### **On Page Load:**
1. Script initializes
2. Waits 1 second
3. Generates session ID (if new)
4. Sends POST request to API
5. Receives 200 OK response
6. Stores visit ID in sessionStorage

### **On Navigation (Hash Change):**
1. User clicks link (e.g., Catalog tab)
2. URL hash changes to `#catalog`
3. Debounce waits 500ms
4. Sends POST request with new URL
5. Visit recorded with updated page info

### **On Browser Navigation:**
1. User clicks back/forward button
2. Popstate event triggers
3. Sends POST request immediately
4. Visit recorded with navigation info

## 🎯 Production Deployment

### **Before deploying to production:**

1. **Disable Debug Mode:**
   ```javascript
   const DEBUG_MODE = false;
   ```

2. **Verify API URL:**
   ```javascript
   const VISIT_API_URL = 'https://apigateway.up.railway.app/v1/visits';
   ```

3. **Test on production domain:**
   - Ensure CORS is configured for your domain
   - Verify API is accessible from production

4. **Monitor in production:**
   - Check API logs for incoming requests
   - Verify visits are being recorded
   - Monitor for any CORS or network errors

## 📝 Notes

- **Privacy:** Session ID is browser-specific and doesn't track across devices
- **Performance:** API calls are asynchronous and don't block page rendering
- **Reliability:** Fails silently if API is unavailable (won't break your website)
- **Accuracy:** Tracks actual user navigation behavior

## 🚀 Next Steps

1. Enable debug mode and test locally
2. Verify API calls in Network tab
3. Check console for any errors
4. Test navigation between tabs
5. Verify session persistence
6. Disable debug mode for production
7. Deploy and monitor

---

**Last Updated:** October 12, 2025  
**Integration Status:** ✅ Complete and Ready for Testing

