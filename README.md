Sadguru Medical & Pharmacy + AI Assistant
A modern, full-stack pharmacy management system integrated with an AI-powered Health Assistant built on the Gemini 2.5 Flash model.

🚀 Live Demo
View the project here: https://sadguru-medical-pharmacy.onrender.com/

🤖 Featured: AI Health Interceptor
1. The project includes a custom-built AI Chatbot controller that acts as a first-line informational resource. It is programmed with a "Safety-First" architecture:
2. Emergency Interceptor: Hard-coded keyword detection for life-threatening scenarios (Overdose, Chest Pain, etc.) that bypasses the AI to provide immediate emergency contact numbers.
3. Legal Boundary Prompting: The AI is strictly restricted from suggesting Schedule H brand-name drugs and focuses solely on OTC ingredients (e.g., Paracetamol).
4. Medical Disclaimer: Every AI-generated response is automatically prefixed with a legal disclaimer to ensure user safety.

📦 Inventory & Operations
1. Home Page: Displays a curated list of products, all available categories, and best-selling items using a custom animation engine.
2. Search & Filter: Enables advanced product discovery by name, category, price range.
3. Seller Dashboard: Enables sellers to add new products, list and edit existing inventory, manage stock levels, and monitor customer orders.
4. Payment Integration: Secure online transactions powered by the Stripe payment gateway.
5. CRUD Operations: Seamless management of the shopping experience, including adding/removing items from the cart and tracking personal order history.
6. Authentication: Secure Login and Signup functionality to protect user data and administrative access.

The application uses React Router DOM for seamless navigation, featuring public customer routes and protected seller/admin routes.
🛒 Customer Routes
1. / – Home: Landing page with featured categories.
2. /products – Catalog: Browse all available medical supplies.
3. /product/:category/:id – Details: In-depth information about a specific medicine with categories like devices,medicines,etc
4. /cart – Shopping Cart: Manage selected items for purchase.
5. /my-orders – User History: View previous purchases and status.
6. /chatbot – AI Assistant: Access the Gemini-powered health bot.

🛡Protected Seller/Admin Routes
The system uses a SellerLayout to protect sensitive administrative actions:
1. /seller – Dashboard: Access point for sellers (requires login) & option to add Product with images
2. /seller/product-list – Inventory List: Table view of all stock for editing/deletion i.e to change the stock
3. /seller/orders – Order Management: View and update status of customer orders.

🛠 Tech Stack
Layer              Technology
1. Frontend        React.js, React Router DOM, JavaScript (ES6+)StylingTailwind CSS / Bootstrap
2. Backend         Node.js, Express.js
3. Database        MongoDB (via Mongoose)
4. AI Integration  Google Gemini API 
5. Deployment      Render
