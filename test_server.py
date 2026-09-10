import http.server
import socketserver
import json
import sys

class TestHandler(http.server.BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        results = json.loads(post_data.decode('utf-8'))
        
        passed = 0
        failed = 0
        print("\n--- UNIT TEST RESULTS ---")
        for res in results:
            status = "✅ PASS" if res['passed'] else "❌ FAIL"
            if res['passed']: passed += 1
            else: failed += 1
            print(f"{status}: {res['message']}")
        
        print(f"\nTotal: {len(results)} | Passed: {passed} | Failed: {failed}")
        print("-------------------------")
        
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(b'OK')
        
        # Shutdown server after receiving results
        def kill_me():
            self.server.shutdown()
        import threading
        threading.Thread(target=kill_me).start()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

port = 8001
httpd = socketserver.TCPServer(("", port), TestHandler)
print(f"Test server listening on port {port}")
httpd.serve_forever()
