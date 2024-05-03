module.exports = function (app,db) {
    app.put('/orders/:id', (req, res) => {
    const { id } = req.params;
    const { fullName, email, description } = req.body;
    const sql = `UPDATE orders SET orders_name = ?, orders_email = ?, orders_description = ? WHERE orders_id = ?`;
    db.query(sql, [fullName, email, description, id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error updating record' });
            return;
        }
        res.json({ message: 'Record updated successfully' });
    });
});
};
