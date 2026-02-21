import { Connection } from "../models/connectionRequest.js";
import express from "express"

const requestRouter = express.Router();
import authUser from "../middlewares/auth.middleware.js";
import { User } from "../models/user.models.js";

requestRouter.post("/request/send/:status/:toUserId", authUser, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status

        if (fromUserId.toString() === toUserId.toString()) {
            return res.status(400).json({
                message: "You cannot send request to yourself"
            })
        }

        const allowedRequest = ["ignored", "interested"]
        if (!allowedRequest.includes(status)) {
            return res.status(400).send("Not valid Request");
        }

        const existconnectionUser = await Connection.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ],
        })
        if (existconnectionUser) {
            return  res.status(400).send("Exist the user Already")
        }


        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(404).json({
                message: "User is not defined"
            })
        }


        const connectionRequest = new Connection({
            fromUserId,
            toUserId,
            status,
        })

        const data = await connectionRequest.save();

         return res.status(200).json({ message: "Request successfully sent", data })

    }
    catch (error) {
       return  res.status(400).send("Error" + error.message)
    }
})


requestRouter.get("/requests", authUser, async (req, res) => {
  try {
    const requests = await Connection.find({
      toUserId: req.user._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName age gender");

    // 🔥 NULL USERS FILTER
    const safeRequests = requests.filter(
      (req) => req.fromUserId !== null
    );

    return res.status(200).json(safeRequests);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

requestRouter.post("/request/review/:status/:requestId", authUser, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;

        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) {
         return    res.status(400).json({ message: "User is not present" })
        }

        const connectionRequest = await Connection.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId","firstName lastName")
        if (!connectionRequest) {
          return    res.status(400).json({ message: "Connection Request Not found" })
        }
       

        if (status === "accepted") {
      // ✅ ACCEPT → mark accepted (or move to connections)
      connectionRequest.status = "accepted";
      await connectionRequest.save();
    }

    if (status === "rejected") {
      // ✅ REJECT → delete request
      await Connection.findByIdAndDelete(requestId);
    }

    return res.status(200).json({
      message: `Request ${status} successfully`,
    });
  } catch (error) {
    return res.status(400).send("Error " + error.message);
  }
})

export default requestRouter;