

const ObjectId = require("mongodb").ObjectID;
import {
  encryptpassword,
  decryptPassword,
  generateJwtTokenFn,
  generateRandom,
} from "../../utilities/universal";
const dbService = require("../../utilities/dbService");

/*************************** addUser ***************************/
const addUser = async (req, res) => {
  try {
    //console.log("Received request:", req.body);
    const { fullName, email, phone, password } = req.body;

    // Check if email already exists
    let existingUser = await dbService.findOneRecord("userModel", { email });
    if (existingUser) {
      return { success: false, message: "Email Address Already Exists!" };
    }

    // Encrypt the password
    let hashedPassword = await encryptpassword(password);
    //console.log("Encrypted password:", hashedPassword);

    // Create user data object
    const newUser = {
      fullName,
      email,
      phone,
      password: hashedPassword,
      createdAt: new Date(),
      loginToken: [],
      registeredEvents: [],
    };

    // Save user to database
    let userData = await dbService.createOneRecord("userModel", newUser);
    console.log("User added successfully:", userData);

    // Generate JWT token
    try{
      const token = generateJwtTokenFn({ userId: userData._id});
      //console.log("Generated token:", token);

      // Update user record with the new token
      //await dbService.findOneAndUpdateRecord("userModel", { email: newUser.email }, { $set: { loginToken: token } });
      let updatedUser = await dbService.findOneAndUpdateRecord(
        "userModel",
        { email: newUser.email },
        { $set: { loginToken: [token] } }, // Store token as an array
        { new: true }
      );
      console.log("Updated User-->",updatedUser);
      
      return {success: true,message: "User registered successfully!",user: updatedUser };
    }
    catch (tokenError) {
      console.error("JWT Token Error:", tokenError);
      return { success: false, message: "Failed to generate token." };
    }
  } catch (error) {
    console.error("Error adding user:", error);
    return { success: false, message: "Server error. Please try again later." };
  }
};

/************************************** getUser***********************************/
const getUser = async (req, res) => {
  try {
      const { req } = args;  // Extract request object
      const userId = req?.user?.userId;  // Extract user ID

      console.log("UserId-->", userId);

      if (!userId) {
          throw new Error("User ID is required");
      }

      const userData = await dbService.findOneRecord("userModel", { _id: userId }, "-password");

      if (!userData) {
          throw new Error("User not found");
      }

      return {
          status: "Success",
          message: "User profile fetched successfully.",
          data: userData,
      };
  } catch (error) {
      return {
          status: "Error",
          message: error.message || "Failed to fetch user profile",
      };
  }
};

module.exports = getUser;



/*************************** loginCustomer ***************************/
export const onLogin = async (req, res, next) => {
  const payload = req.body;
  console.log("payload==>", payload);
  let userData = await dbService.findOneRecord("userModel", {
    email: payload.email.toLowerCase(),
  });
  console.log("userData==>", userData);
  if (!userData) throw new Error("Email not exists");

  let match = await decryptPassword(payload.password, userData.password);
  if (!match) throw new Error("Password Invalid");
  console.log("hello");

  if (userData?.loginToken) {
    if (userData?.loginToken?.length >= 1) {
      let rr = await dbService.findOneAndUpdateRecord(
        "userModel",
        { _id: userData._id },
        {
          $pop: { loginToken: -1 },
        },
        { new: true }
      );
    }
  }
  console.log("hell");


  let token = await generateJwtTokenFn({ userId: userData._id });
  let updateData = {
    $push: {
      loginToken: {
        token: token,
      },
    },
    // lastLoginDate: Date.now(),
  };

  let data = await dbService.findOneAndUpdateRecord(
    "userModel",
    { _id: userData._id },
    updateData,
    { new: true }
  );
  console.log("d->", data);

  // res.setHeader("Access-Control-Expose-Headers", "token");
  // res.setHeader("token", data.loginToken[data.loginToken.length - 1].token);

  const options = {
    expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  // res.cookie("token", token, options);

  return {
    token: token, // Return the generated token
    userId: userData._id,
    // email: data.email,
    // lastLogin: data.lastLoginDate,
    // ...data._doc,
    data: data
    // token: token,
  };
};

/*************************** getcontractors ***************************/
const getcontractor = async (req, mainUserId, createdBy) => {
  let postData = req.body;
  let { page = 1, limit = 0 } = req.body;
  let skiprecord = limit * page - limit;
  let ctype = postData.contractorType;
  let where = {
    mainUserId: ObjectId(mainUserId),
    isDeleted: false,
  };
  if (ctype && ctype.length) {
    where["contractorType"] = { $in: postData.contractorType };
  }

  if (postData.searchText) {
    // where["firstName"] = { $regex: postData.searchText, $options: "i" };
    //where["lastName"] =  { $regex: postData.searchText, $options: "i" };
    where = {
      ...where,
      ...{
        $or: [
          { firstName: { $regex: postData.searchText, $options: "i" } },
          { lastName: { $regex: postData.searchText, $options: "i" } },
          { companyName: { $regex: postData.searchText, $options: "i" } },
        ],
      },
    };
  }

  let sort = {};

  if (postData.sortBy && postData.sortMode) {
    if (postData.sortBy == "fullName") {
      sort["firstName"] = postData.sortMode;
    } else {
      sort[postData.sortBy] = postData.sortMode;
    }
  } else {
    sort["createdAt"] = -1;
  }

  let totalrecord = await contractorModel.findWithCount(
    "contractorModel",
    where
  );
  var results = await contractorModel.findOrderWithSort(
    "contractorModel",
    where,
    sort,
    skiprecord,
    limit
  );
  var result = JSON.parse(JSON.stringify(results));
  if (result.length !== 0) {
    for (let i = 0; i < result.length; i++) {
      Object.assign(result[i], {
        fullName: result[i].firstName + " " + result[i].lastName,
      });
    }
  }
  return {
    status: "Success",
    message: "all Contractor fetched successfully.",
    items: result,
    page: page,
    count: totalrecord,
    limit: limit,
  };
  // } else {
  //   throw new Error("Contractor Not found");
  // }
};

/*************************** getcontractorwithid ***************************/
const getcontractorwithid = async (req, mainUserId, createdBy) => {
  let fileCount = 0;
  let where = {
    _id: req.body.id,
    mainUserId: ObjectId(mainUserId),
    isDeleted: false,
  };
  let result = await contractorModel.findOneQuery("contractorModel", where);
  if (result) {
    let folderAggregateQuery = [
      { $match: { isDeleted: false, subModuleId: result._id } },
      // {
      //   $lookup: {
      //     from: "files",
      //     let: { folderId: "$_id" },
      //     pipeline: [
      //       {
      //         $match: {
      //           $expr: { $eq: ["$folderId", "$$folderId"] },
      //           isDeleted: false,
      //         },
      //       },
      //     ],
      //     as: "fileData",
      //   },
      // },
      // {
      //   $group: {
      //     _id: null,
      //     fileCount: {
      //       $sum: {
      //         $size: "$fileData",
      //       },
      //     },
      //   },
      // },
    ];
    // [[{ fileCount = 0 } = {}]] = await Promise.all([
    //   await FolderModel.aggregateData(folderAggregateQuery),
    // ]);
    return { result, fileCount };
  } else {
    return { result, fileCount };
  }
};

/*************************** deletecontractor ***************************/
const deletecontractor = async (req, mainUserId, createdBy) => {
  let cid = req.body.id;

  let where = {};
  where["_id"] = cid;
  where["mainUserId"] = ObjectId(mainUserId);
  let contractordata = await contractorModel.findByConditionAndUpdate(
    "contractorModel",
    where,
    {
      isDeleted: true,
    }
  );
  return "contractor data updated";
};

/*************************** updatecontractor ***************************/
const updatecontractor = async (req, mainUserId, createdBy) => {
  req.body["updatedAt"] = new Date();
  if (req.body.email == "" || !req.body.email) {
    let project = await contractorModel.findByConditionAndUpdate(
      "contractorModel",
      { _id: ObjectId(req.query.id) },
      req.body
    );
    return "data updated";
  } else {
    let contractorData = await contractorModel.findOneQuery("contractorModel", {
      _id: { $ne: ObjectId(req.query.id) },
      email: req.body.email,
    });
    if (contractorData) {
      throw new Error("Email Address Already Exists!");
    } else {
      let project = await contractorModel.findByConditionAndUpdate(
        "contractorModel",
        { _id: ObjectId(req.query.id) },
        req.body
      );
      return project;
    }
  }
};

module.exports = {
  addUser,
  onLogin,
  getcontractor,
  getcontractorwithid,
  deletecontractor,
  updatecontractor,
};
