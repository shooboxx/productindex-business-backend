import express from "express";
const router = express.Router();
import { EmloyeeService } from './employeeService';
import {AccessLevel} from './enums/employeeAccessLevelEnum'


router.get("/employees", async (req: any, res: any) => { //TODO: Only user with access to this business can hit this
    try {
      const {businessId, firstName, lastName, accessLevel} = req.query
      const userInfo = {firstName, lastName, accessLevel}
      if (!businessId) return res.status(200).json(null);

      const employees = await EmloyeeService.getBusinessEmployees(businessId, userInfo);
      return res.status(200).json(employees);
    } catch (e : any) {
        return res.status(e.statusCode).json({error: e.message})
    }
});

router.put("/employees/:employeeId", async (req: any, res: any) => {
    try {
      await EmloyeeService.updateEmployeeAccessLevel(req.params.employeeId, AccessLevel[req.body.access_level]);
      return res.status(200).json({success : true});
    } catch (e : any) {
        return res.status(e.statusCode).json({error: e.message})
    }
});

router.delete("/employees/:employeeId", async (req: any, res: any) => {
    try {
      await EmloyeeService.deleteEmployee(req.params.employeeId);
      return res.status(200).json({success : true});
    } catch (e : any) {
        return res.status(e.statusCode).json({error: e.message})
    }
});

router.post("/employees", async (req: any, res: any) => {
    try {
      const employee = await EmloyeeService.createEmployee(req.body.business_id, req.body.user_id, AccessLevel[req.body.access_level]);
      return res.status(200).json(employee);
    } catch (e : any) {
        return res.status(e.statusCode).json({error: e.message})
    }
});


module.exports = router