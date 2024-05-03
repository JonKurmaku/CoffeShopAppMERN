module.exports = function (app,db) {
    app.get('/orders', (req, res) => {
        const sql = 'SELECT * FROM orders';
        db.query(sql, (err, result) => {
            if (err) {
                console.error(err); 
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            if (result.length > 0) {
                console.log(result)
                res.json(result);
            } else {
                res.status(404).json({ message: 'No orders found' });
            }
        });
    });
    
};

