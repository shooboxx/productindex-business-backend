import express from "express";
const router = express.Router();
import { EmployeeService } from './employeeService';
import {AccessLevel} from './enums/employeeAccessLevelEnum'
import { authenticateToken, hasRole } from '../auth/authorization';


router.get("/business/:businessId/employees", authenticateToken, async (req: any, res: any) => {
    try {
      const {firstName, lastName, accessLevel} = req.query
      const userInfo = {firstName, lastName, accessLevel}
      if (!req.params.businessId) return res.status(200).json(null);

      const employees = await EmployeeService.getBusinessEmployees(req.params.businessId, userInfo);
      return res.status(200).json(employees);
    } catch (e : any) {
        return res.status(e.statusCode).json({error: e.message})
    }
});

router.get("/business/:businessId/employee/verify", async (req: any, res: any) => {
  try {
    const {code} = req.query
    if (!code) return res.status(400).json(null);

    await EmployeeService.verifyEmployee(code);
    return res.status(200).json({success: true});
  } catch (e : any) {
      return res.status(e.statusCode).json({error: e.message})
  }
});

router.put("/business/:businessId/employees/:employeeId", authenticateToken, hasRole(), async (req: any, res: any) => {
    try {
      await EmployeeService.updateEmployeeAccessLevel(req.params.employeeId, AccessLevel[req.body.access_level]);
      return res.status(200).json({success : true});
    } catch (e : any) {
        return res.status(e.statusCode).json({error: e.message})
    }
});

router.delete("/business/:businessId/employees/:employeeId", authenticateToken, hasRole(), async (req: any, res: any) => {
    try {
      await EmployeeService.deleteEmployee(req.params.employeeId);
      return res.status(200).json({success : true});
    } catch (e : any) {
        return res.status(e.statusCode).json({error: e.message})
    }
});

router.post("/business/:businessId/employees", authenticateToken, hasRole(), async (req: any, res: any) => {
    try {
      const employee = await EmployeeService.createEmployee(req.params.businessId, req.body.user_id, AccessLevel[req.body.access_level]);
      return res.status(200).json(employee);
    } catch (e : any) {
        return res.status(e.statusCode).json({error: e.message})
    }
});


module.exports = router