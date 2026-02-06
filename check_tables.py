#!/usr/bin/env python3
"""Check if tables exist and their structure"""

import urllib.request
import json

URL = 'https://zhlldovnjbfyznyrvwma.supabase.co'
KEY = 'sb_publishable_DqLUm1QC8717HbqkCk5puA_Jc-dst9r'

headers = {
    'apikey': KEY,
    'Authorization': f'Bearer {KEY}'
}

def fetch(endpoint):
    try:
        req = urllib.request.Request(f"{URL}/rest/v1/{endpoint}", headers=headers)
        with urllib.request.urlopen(req, timeout=10) as response:
            return {"status": response.status, "data": json.loads(response.read().decode())}
    except urllib.error.HTTPError as e:
        return {"status": e.code, "error": json.loads(e.read().decode()).get('message', str(e))}
    except Exception as e:
        return {"error": str(e)}

print("=== 检查表是否存在 ===")

# Try to get table info
result = fetch('?table=profiles')
print(f"profiles 表: {result}")

result = fetch('?table=orders')  
print(f"orders 表: {result}")

# Try to INSERT a test record (anon key should allow this with RLS)
print("\n=== 测试插入数据权限 ===")
import json

test_data = json.dumps({
    "user_id": "test-user-id",
    "tour_name": "Test Tour",
    "price": 1000,
    "status": "pending"
}).encode()

try:
    req = urllib.request.Request(
        f"{URL}/rest/v1/orders",
        data=test_data,
        headers={**headers, 'Content-Type': 'application/json', 'Prefer': 'return=minimal'}
    )
    with urllib.request.urlopen(req, timeout=10) as response:
        print(f"插入测试数据: 成功 (status: {response.status})")
except urllib.error.HTTPError as e:
    error_body = json.loads(e.read().decode())
    print(f"插入测试数据: 失败")
    print(f"错误: {error_body}")
