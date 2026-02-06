# lulutravel - Supabase 集成说明

## 概述

网站已完成 Supabase 身份认证和订单管理集成，用户可以：
- 注册/登录账户
- 浏览产品并提交预订
- 管理个人订单

## 文件结构

```
js/
├── supabase-config.js    # Supabase 配置（API 密钥）
├── auth.js              # 统一认证状态管理
└── main.js              # 主要交互逻辑

HTML 页面:
├── index.html           # 首页
├── login.html           # 注册/登录
├── profile.html         # 个人中心 + 订单管理
├── cart.html            # 购物车
├── product-*.html       # 产品详情 + 预订
└── booking.html         # 预订表单
```

## Supabase 配置

**当前配置** (来自 `js/supabase-config.js`):
- URL: `https://zhlldovnjbfyznyrvwma.supabase.co`
- Key: `sb_publishable_DqLUm1QC8717HbqkCk5puA_Jc-dst9r`

**注意**: 如需更换项目，请在 `js/supabase-config.js` 中更新配置。

## 数据库 Schema

在 Supabase Dashboard 中执行以下 SQL 创建所需表：

```sql
-- 创建 profiles 表（用户信息）
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    email TEXT,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建 orders 表（订单）
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    tour_name TEXT NOT NULL,
    tour_route TEXT,
    tour_icon TEXT,
    price INTEGER,
    travelers INTEGER DEFAULT 1,
    days INTEGER DEFAULT 7,
    travel_date TEXT,
    status TEXT DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 启用 Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 创建访问策略
-- 用户只能查看和编辑自己的 profile
CREATE POLICY "Users can view own profiles" ON profiles 
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profiles" ON profiles 
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profiles" ON profiles 
    FOR UPDATE USING (auth.uid() = user_id);

-- 用户只能查看和编辑自己的订单
CREATE POLICY "Users can view own orders" ON orders 
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders" ON orders 
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own orders" ON orders 
    FOR UPDATE USING (auth.uid() = user_id);

-- 创建索引以提高查询性能
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
```

## 功能流程

### 1. 用户注册/登录
- 访问 `/login.html`
- 使用邮箱注册或登录
- 注册后需验证邮箱（Supabase 自动发送验证邮件）

### 2. 浏览产品
- 访问首页 `/index.html`
- 点击产品卡片进入详情页

### 3. 提交预订
- 在产品详情页填写预订表单
- 登录用户可直接提交预订
- 未登录用户会提示先登录

### 4. 购物车结账
- 将产品加入购物车
- 结账时检查登录状态
- 登录后批量保存订单到 Supabase

### 5. 订单管理
- 访问 `/profile.html`
- 查看所有历史订单
- 订单状态：pending → confirmed → completed

## 当前功能状态

| 功能 | 状态 | 说明 |
|------|------|------|
| 用户注册 | ✅ | 使用 Supabase Auth |
| 用户登录 | ✅ | 使用 Supabase Auth |
| 邮箱验证 | ✅ | Supabase 自动发送 |
| 密码重置 | ✅ | 通过邮件链接 |
| 产品预订 | ✅ | 保存到 orders 表 |
| 购物车结账 | ✅ | 批量保存订单 |
| 订单列表 | ✅ | 在个人中心查看 |
| 退出登录 | ✅ | 清除会话 |

## 注意事项

1. **邮箱验证**: 注册后用户需点击验证邮件中的链接才能登录
2. **RLS 策略**: 确保已启用，阻止用户访问他人数据
3. **测试期间**: 可在 Supabase Dashboard 手动禁用邮箱验证

## 测试步骤

1. 在 Supabase Dashboard 执行上述 SQL 创建表
2. 确保 RLS 策略已创建
3. 访问网站测试注册/登录/预订流程
4. 在 Dashboard 查看 profiles 和 orders 表数据
