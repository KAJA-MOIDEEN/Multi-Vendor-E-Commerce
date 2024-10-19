import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  try {
    let { token } = req.headers; // Use 'let' instead of 'const' to allow reassignment
    


    // Check if the token starts with 'token ' and remove it
    if (token) {
    //   token = token.split(' ')[1]; // Remove the 'token ' part


    }

    // console.log("after : token", token);

    if (!token) {
      return res.json({ success: false, message: 'Not Authorized Login Again' });
    }

    const token_decode = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(token_decode._id,"id")
     req.body.userId = token_decode._id;
     console.log(req.body)
    next();

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
