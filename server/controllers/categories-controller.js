const express = require("express");
const categoriesLogic = require("../logic/categories-logic");
const router = express.Router();


router.get("/" , async (request , response , next) => {
    try{
        const category = await categoriesLogic.getAllCategories();
        response.json(category);
    }catch(e){
        return next(e);
    }
})

router.get("/:name" , async (request , response , next) => {
    let Categorykeyword =  request.params.name;
    console.log(Categorykeyword)
    try{
        let categories = await categoriesLogic.getCategoriesByNameKeywords(Categorykeyword);
        response.json(categories)
    }catch(e){
        return next(e);
    }
});
module.exports = router;