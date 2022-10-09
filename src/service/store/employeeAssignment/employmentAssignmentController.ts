import express from "express";
const router = express.Router();
import { EmployeeAssignmentService } from '../employeeAssignment/employeeAssignmentService';

router.get("/store/:storeId/employees", async (req, res) => {
    try {
        const employees = await EmployeeAssignmentService.getStoreEmployees(req.params.storeId)
        return res.status(200).json(employees)
    }
    catch (e) {
        return res.status(e.statusCode).json({error: e.message})
        
    }
})
router.post("/store/:storeId/employees/:employeeId", async (req, res) => {
    try {
        const employeeAssignment = await EmployeeAssignmentService.assignEmployeeToStore(req.params.employeeId, req.params.storeId)
        return res.status(200).json(employeeAssignment)
    }
    catch (e) {
        return res.status(e.statusCode).json({error: e.message})
        
    }
})

router.delete("/store/:storeId/employees/:employeeId", async (req, res) => {
    try {
        await EmployeeAssignmentService.removeEmployeeFromStore(req.params.employeeId, req.params.storeId)
        return res.status(200).json({success: true})
    }
    catch (e) {
        return res.status(e.statusCode).json({error: e.message})
    }
})

module.exports = router