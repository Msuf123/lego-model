
import { useState } from 'react'
import './App.css'

const products = [
  { id: 1, name: 'LEGO Millennium Falcon', price: 159.99, category: 'Star Wars', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600', rating: 4.9 },
  { id: 2, name: 'LEGO City Police Station', price: 89.99, category: 'City', image: 'https://images.unsplash.com/photo-1560961911-ba7ef651a56c?w=600', rating: 4.8 },
  { id: 3, name: 'LEGO Technic Supercar', price: 129.99, category: 'Technic', image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600', rating: 4.7 },
  { id: 4, name: 'LEGO Creator House', price: 69.99, category: 'Creator', image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=600', rating: 4.6 },
  { id: 5, name: 'LEGO Space Explorer', price: 49.99, category: 'City', image: 'https://images.unsplash.com/photo-1560961911-ba7ef651a56c?w=600', rating: 4.8 },
  { id: 6, name: 'LEGO Star Wars Fighter', price: 99.99, category: 'Star Wars', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600', rating: 4.9 },
]

function App() {
  const [cart, setCart] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [showCart, setShowCart] = useState(false)

  const categories = ['All', 'Star Wars', 'City', 'Technic', 'Creator']

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === 'All' || product.category === category)
  )

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  )

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="app">
      <header className="navbar">
        <a className="logo" href="#">🧱 BrickStore</a>

        <nav>
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#about">About</a>
        </nav>

        <button className="cart-btn" onClick={() => setShowCart(!showCart)}>
          🛒 Cart ({cartCount})
        </button>
      </header>

      <section className="hero" id="home">
        <div>
          <span className="tag">BUILD YOUR WORLD</span>
          <h1>Make Your<br />Imagination <span>Real.</span></h1>
          <p>Discover amazing building sets and create something extraordinary.</p>
          <a href="#products" className="shop-btn">Shop Collection →</a>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=900"
            alt="Colorful building bricks"
          />
        </div>
      </section>

      <main className="products-section" id="products">
        <div className="section-heading">
          <div>
            <span className="tag">OUR COLLECTION</span>
            <h2>Explore Products</h2>
          </div>
          <input
            type="text"
            placeholder="Search LEGO sets..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="categories">
          {categories.map(cat => (
            <button
              key={cat}
              className={category === cat ? 'active' : ''}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.map(product => (
            <article className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <span className="rating">⭐ {product.rating}</span>
              </div>
              <div className="product-info">
                <small>{product.category}</small>
                <h3>{product.name}</h3>
                <div className="product-bottom">
                  <strong>€{product.price.toFixed(2)}</strong>
                  <button onClick={() => addToCart(product)}>
                    + Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="empty">No products found.</p>
        )}
      </main>

      {showCart && (
        <div className="cart-overlay">
          <div className="cart-panel">
            <div className="cart-header">
              <h2>Your Cart ({cartCount})</h2>
              <button onClick={() => setShowCart(false)}>✕</button>
            </div>

            {cart.length === 0 ? (
              <p>Your cart is empty. Start shopping!</p>
            ) : (
              <>
                {cart.map(item => (
                  <div className="cart-item" key={item.id}>
                    <div>
                      <h4>{item.name}</h4>
                      <p>€{item.price.toFixed(2)} × {item.quantity}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </div>
                ))}
                <div className="cart-total">
                  <strong>Total</strong>
                  <strong>€{total.toFixed(2)}</strong>
                </div>
                <button className="checkout-btn">
                  Proceed to Checkout
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <footer id="about">
        <h2>🧱 BrickStore</h2>
        <p>Build something amazing. One brick at a time.</p>
        <small>© 2026 BrickStore. Demo e-commerce project.</small>
      </footer>
    </div>
  )
}

export default App
