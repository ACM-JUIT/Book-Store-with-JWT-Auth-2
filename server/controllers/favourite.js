const router = require('express').Router()
const User = require('../models/user')
const {authenticateToken} = require('./userAuth')

router.put('/get-fav',authenticateToken,async(req,res) => {
try {
    const {bookId , id} = req.headers
    const userData = await User.findById(id);
    const isBookFavourite = userData.favourites.includes(bookId)
    if(isBookFavourite)
        {
            return res.status(200).json({message:"Book already favourite"})
        }
    await User.findByIdAndUpdate(id,{$push:{favourites:bookId}})
    return res.status(200).json({message:"Book added to favourites"})
} catch (error) {
    res.status(500).json({message:"Internal Server error"})
}
})

router.delete('/delete-fav',authenticateToken,async(req,res) => {
    try {
        const {bookId , id} = req.headers
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookId)

        if(isBookFavourite)
            {
                await User.findByIdAndUpdate(id,{$pull:{favourites:bookId}})
            }
        return res.status(200).json({message:"Book removed from favourites"})

    } catch (error) {
        res.status(500).json({message:"Internal Server error"})
    }
    })

router.get('/get-fav',authenticateToken,async (req,res) => {
    try {
        const {id} = req.headers
        const userData = await User.findById(id);
        const favouriteBooks = userData.favourites
         
        return res.json({
            status:"success",
            data:favouriteBooks
        })
        } catch (error) {
        res.status(500).json({message:"Internal Server error"})
    }
})

module.exports = router