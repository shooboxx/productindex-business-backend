import db from '../../../models'

const findStoreEmployees = (storeId: number) => {
    return db.EmployeeAssignment.findAll({
        where: {
            business_store_id: storeId
        },
        include: [
            {
                model: db.Employee, where: {deleted_date: null}, 
                attributes: ["business_access_level"], 
                include: [{
                    model: db.Users, where: {deleted_date: null}, attributes:  ["first_name", "last_name"]
                }]
            }
        ]
    })
}
const assignEmployeeToStore = (employeeId: number, storeId: number) => {
    return db.EmployeeAssignment.create({
        employee_id: employeeId,
        business_store_id: storeId
    })
}

const removeEmployeeFromStore = (employeeId: number, storeId: number) => {
    return db.EmployeeAssignment.destroy({
        where: {
            employee_id: employeeId,
            business_store_id: storeId
        }
    })
}
export const EmployeeAssignmentRepo = {
    findStoreEmployees,
    assignEmployeeToStore,
    removeEmployeeFromStore

}