#!/usr/bin/env python3
"""Check Supabase data"""

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
            data = response.read().decode()
            return json.loads(data)
    except Exception as e:
        return {"error": str(e)}

print("=== 检查 profiles 表 ===")
profiles = fetch('profiles?select=*')
print(f"用户数量: {len(profiles) if isinstance(profiles, list) else profiles}")

print("\n=== 检查 orders 表 ===")
orders = fetch('orders?select=*')
print(f"订单数量: {len(orders) if isinstance(orders, list) else orders}")

print("\n=== 检查 auth.users 表 ===")
# auth.users 需要 service role key, 这里可能查不到
print("auth.users 需要 service_role key, 请在 Dashboard 查看")
