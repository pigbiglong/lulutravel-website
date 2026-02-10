-- =============================================================================
-- lulutravel 商户后台 - 数据库迁移脚本
-- =============================================================================
-- 在 Supabase Dashboard SQL Editor 中执行此脚本
-- =============================================================================

-- =============================================================================
-- 第 1 步: 创建管理员表
-- =============================================================================
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    name TEXT,
    role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- 第 2 步: 创建产品表
-- =============================================================================
CREATE TABLE IF NOT EXISTS tour_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    route TEXT,
    icon TEXT,
    hero_image TEXT,
    base_price INTEGER DEFAULT 0,
    days INTEGER DEFAULT 7,
    category TEXT CHECK (category IN ('classic', 'culinary', 'nature', 'custom')),
    highlights TEXT[],
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- 第 3 步: 扩展订单表
-- =============================================================================
ALTER TABLE orders ADD COLUMN IF NOT EXISTS product_id UUID REFERENCES tour_products(id);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS contact_phone TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS special_requests TEXT;

-- =============================================================================
-- 第 4 步: 创建索引
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_orders_created_desc ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_product_id ON orders(product_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON tour_products(category);
CREATE INDEX IF NOT EXISTS idx_products_active ON tour_products(is_active);
CREATE INDEX IF NOT EXISTS idx_admin_users_user_id ON admin_users(user_id);

-- =============================================================================
-- 第 5 步: 管理员 RLS 策略 - 允许管理员访问所有数据
-- =============================================================================

-- 管理员可以查看所有用户资料
DROP POLICY IF EXISTS "Admins view all profiles" ON profiles;
CREATE POLICY "Admins view all profiles" ON profiles FOR SELECT
    USING (
        EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
    );

-- 管理员可以查看所有订单
DROP POLICY IF EXISTS "Admins view all orders" ON orders;
CREATE POLICY "Admins view all orders" ON orders FOR SELECT
    USING (
        EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
    );

-- 管理员可以更新所有订单
DROP POLICY IF EXISTS "Admins update all orders" ON orders;
CREATE POLICY "Admins update all orders" ON orders FOR UPDATE
    USING (
        EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
    );

-- 管理员可以管理所有产品
DROP POLICY IF EXISTS "Admins manage products" ON tour_products;
CREATE POLICY "Admins manage products" ON tour_products FOR ALL
    USING (
        EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
    );

-- 管理员可以查看管理员列表 (仅自己或管理员)
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins view admin list" ON admin_users;
CREATE POLICY "Admins view admin list" ON admin_users FOR SELECT
    USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

-- 管理员可以插入新管理员
DROP POLICY IF EXISTS "Super admins can insert admin" ON admin_users;
CREATE POLICY "Super admins can insert admin" ON admin_users FOR INSERT
    WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND role = 'super_admin'));

-- =============================================================================
-- 第 6 步: 初始产品数据
-- =============================================================================
INSERT INTO tour_products (name, description, route, icon, base_price, days, category, is_active) VALUES
('经典中国之旅', '探索中国最著名的历史文化景点，从长城到兵马俑，感受千年文明的魅力。', '北京-西安-上海', '🏛️', 8500, 7, 'classic', true),
('美食探索之旅', '品尝中国四大菜系，从川菜的麻辣到粤菜的鲜美，开启味蕾之旅。', '成都-广州-香港', '🍜', 6200, 5, 'culinary', true),
('自然风光之旅', '漫步山水之间，从桂林的秀美到九寨沟的神奇，领略大自然的鬼斧神工。', '桂林-张家界-九寨沟', '🏔️', 7800, 8, 'nature', true)
ON CONFLICT DO NOTHING;

-- =============================================================================
-- 第 7 步: 创建更新时间触发器函数
-- =============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 为 admin_users 表添加触发器
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;
CREATE TRIGGER update_admin_users_updated_at
    BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 为 tour_products 表添加触发器
DROP TRIGGER IF EXISTS update_tour_products_updated_at ON tour_products;
CREATE TRIGGER update_tour_products_updated_at
    BEFORE UPDATE ON tour_products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- 完成!
-- =============================================================================
