
// add product
const addProduct = async (req,res)=>{
    try {
        const {name,description,price,category,subCategory,sizes,bestseller}  = req.body
        const image1 =req.files.image1 || req.files.image1[0]
        const image2 =req.files.image2 || req.files.image2[0]
        const image3 =req.files.image3 || req.files.image3[0]
        const image4 =req.files.image4 || req.files.image4[0]
        console.log(name,description,price,image,category,subCategory,sizes,bestseller,date)
        console.log(image1,image2,image3,image4);
        
    } catch (error) {
        console(error)
        res.json({
            status: false,
            message: "Error adding product"
        })   
    } 

}
// remove product
const removeProduct = async (req,res)=>{

}

// list product
const listProduct = async (req,res)=>{

}

//  single product
const singleProduct = async (req,res)=>{

}

export {addProduct,removeProduct,listProduct,singleProduct}
