-- =============================================================================
-- lulutravel 数据库设置脚本 (v2 - 修复版)
-- =============================================================================
-- 执行前请先删除之前创建失败的表:
-- DROP TABLE IF EXISTS public.orders CASCADE;
-- DROP TABLE IF EXISTS public.profiles CASCADE;
-- DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users CASCADE;
-- =============================================================================

-- =============================================================================
-- 第 1 步: 创建 profiles 表 (用户信息)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    email TEXT,
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- 第 2 步: 创建 orders 表 (订单信息)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    tour_name TEXT NOT NULL,
    tour_route TEXT,
    tour_icon TEXT,
    price INTEGER DEFAULT 0,
    travelers INTEGER DEFAULT 1,
    days INTEGER DEFAULT 7,
    travel_date TEXT,
    status TEXT DEFAULT 'pending',
    notes TEXT,
    total_price INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- 第 3 步: 添加索引 (提高查询性能)
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);

-- =============================================================================
-- 第 4 步: 启用 Row Level Security (RLS) - 安全性
-- =============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- 第 5 步: 创建 profiles 表的访问策略
-- =============================================================================
DROP POLICY IF EXISTS "Users can view own profiles" ON public.profiles;
CREATE POLICY "Users can view own profiles" ON public.profiles
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own profiles" ON public.profiles;
CREATE POLICY "Users can insert own profiles" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own profiles" ON public.profiles;
CREATE POLICY "Users can update own profiles" ON public.profiles
    FOR UPDATE USING (auth.uid() = user_id);

-- =============================================================================
-- 第 6 步: 创建 orders 表的访问策略
-- =============================================================================
DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
CREATE POLICY "Users can view own orders" ON public.orders
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own orders" ON public.orders;
CREATE POLICY "Users can insert own orders" ON public.orders
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own orders" ON public.orders;
CREATE POLICY "Users can update own orders" ON public.orders
    FOR UPDATE USING (auth.uid() = user_id);

-- =============================================================================
-- 第 7 步: 创建触发器 - 自动创建 profile
-- =============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, email, name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', NEW.email)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================================================
-- 完成! 
-- =============================================================================
-- 现在可以测试网站了:
-- 1. 打开本地网站
-- 2. 注册/登录账户
-- 3. 提交预订
-- 4. 在个人中心查看订单
-- =============================================================================
