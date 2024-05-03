module.exports = function (app,db) {
app.delete('/orders/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM orders WHERE orders_id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error deleting record' });
            return;
        }
        res.json({ message: 'Record deleted successfully' });
    });
});
};
