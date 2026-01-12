-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(20) DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    model_url TEXT NOT NULL,
    thumbnail_url TEXT,
    stock INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(30) DEFAULT 'CREATED',
    total_amount NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);


-- -------------------------------
-- SAMPLE PRODUCTS (seed data)
-- -------------------------------
-- NOTE: model_url and thumbnail_url are relative paths served from the backend public folder

INSERT INTO products (name, description, price, model_url, thumbnail_url, stock)
VALUES
('Modern Chair', 'Comfortable modern chair with soft cushions and wooden legs.', 1299.00, '/models/chair.glb', '/images/chair.png', 12),
('Office Desk', 'Minimal office desk with cable management and durable surface.', 4999.00, '/models/desk.glb', '/images/desk.png', 8),
('Minimal Lamp', 'Sleek LED floor lamp with adjustable brightness and tilt.', 2499.00, '/models/desk.glb', '/images/desk.png', 20),
('Lounge Sofa', 'Two-seater lounge sofa with plush seating and removable covers.', 15999.00, '/models/chair.glb', '/images/chair.png', 5),
('Standing Desk', 'Height-adjustable standing desk with memory presets.', 7999.00, '/models/desk.glb', '/images/desk.png', 7),
('Dining Chair', 'Set of dining chairs with ergonomic back support.', 3199.00, '/models/chair.glb', '/images/chair.png', 15),
('Bookshelf', 'Open-shelf bookshelf made from engineered wood.', 3999.00, '/models/desk.glb', '/images/desk.png', 10),
('Coffee Table', 'Low-profile coffee table with tempered glass top.', 2199.00, '/models/chair.glb', '/images/chair.png', 9),
('Floor Lamp', 'Arc floor lamp with fabric shade and metal base.', 2799.00, '/models/desk.glb', '/images/desk.png', 11),
('Side Table', 'Compact side table with drawer and storage shelf.', 1899.00, '/models/chair.glb', '/images/chair.png', 18)
ON CONFLICT DO NOTHING;
