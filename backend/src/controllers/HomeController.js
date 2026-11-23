const getHome = (req, res) => {
    res.json({
        message: 'Đây là trang Home'
    });
};

module.exports = {
    getHome
};