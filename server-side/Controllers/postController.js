module.exports = function (app,db) {
 app.post('/orders', (req, res) => {
    const { fullName, email, description } = req.body;
    const sql = `INSERT INTO orders (orders_name, orders_email, orders_description) VALUES (?, ?, ?)`;
    db.query(sql, [fullName, email, description], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to add the order' });
            return;
        }
        const newOrder = { fullName, email, description };
        res.json({ message: 'Order added successfully', order: newOrder });
    });
});
};
