To solve the inventory problems in retail stores, we propose a Multi-Agent AI System.

This system will have multiple intelligent agents that work together to:

Predict product demand 📊

Monitor stock levels in real-time 📦

Automatically order items when needed 🚛

Adjust prices smartly based on sales trends 💰

Share data between stores, warehouses, and suppliers

User clicks: “Check Forecast” for Shampoo
        ↓
📤 React sends: /predict_demand?product_id=101
        ↓
🧠 Forecast Agent says: "You’ll need 80 units next week"
        ↓
🏪 Store Agent sees: "Only 4 left, request restock"
        ↓
🚛 Supplier Agent says: "Sending 76 more units"
        ↓
🏢 Warehouse confirms: "Stock ready to ship"
        ↓
🌐 Frontend shows: Forecast, Restock Status
