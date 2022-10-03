import express from "express";
const router = express.Router();
import { EmployeeService } from './employeeService';
import {AccessLevel} from './enums/employeeAccessLevelEnum'


router.get("/employees", async (req: any, res: any) => { //TODO: Only user with access to this business can hit this
    try {
      const {businessId, firstName, lastName, accessLevel} = req.query
      const userInfo = {firstName, lastName, accessLevel}
      if (!businessId) return res.status(200).json(null);

      const employees = await EmployeeService.getBusinessEmployees(businessId, userInfo);
      return res.status(200).json(employees);
    } catch (e : any) {
        return res.status(e.statusCode).json({error: e.message})
    }
});

router.get("/employee/verify", async (req: any, res: any) => {
  try {
    const {code} = req.query
    if (!code) return res.status(400).json(null);

    await EmployeeService.verifyEmployee(code);
    return res.status(200).json({success: true});
  } catch (e : any) {
      return res.status(e.statusCode).json({error: e.message})
  }
});

router.put("/employees/:employeeId", async (req: any, res: any) => {
    try {
      await EmployeeService.updateEmployeeAccessLevel(req.params.employeeId, AccessLevel[req.body.access_level]);
      return res.status(200).json({success : true});
    } catch (e : any) {
        return res.status(e.statusCode).json({error: e.message})
    }
});

router.delete("/employees/:employeeId", async (req: any, res: any) => {
    try {
      await EmployeeService.deleteEmployee(req.params.employeeId);
      return res.status(200).json({success : true});
    } catch (e : any) {
        return res.status(e.statusCode).json({error: e.message})
    }
});

router.post("/employees", async (req: any, res: any) => {
    try {
      const employee = await EmployeeService.createEmployee(req.body.business_id, req.body.user_id, AccessLevel[req.body.access_level]);
      return res.status(200).json(employee);
    } catch (e : any) {
        return res.status(e.statusCode).json({error: e.message})
    }
});


module.exports = router