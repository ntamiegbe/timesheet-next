import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar'
import { FaTimes } from 'react-icons/fa';

const AdminPage = () => {
  const router = useRouter();
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Developer' }
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = (data) => {
    // Check if any input fields are empty
    const hasEmptyFields = Object.values(data).some(
      (value) => value === undefined || value === ""
    );

    if (hasEmptyFields) {
      // If any fields are empty, don't submit the form
      return;
    }

    // Check if employee exists
    const existingEmployee = employees.find(
      (employee) => employee.email === data.email
    );
    if (existingEmployee) {
      // Update existing employee
      const updatedEmployees = employees.map((employee) =>
        employee.email === data.email ? { ...employee, ...data } : employee
      );
      setEmployees(updatedEmployees);
    } else {
      // Create new employee
      const newEmployee = {
        id: employees.length + 1,
        ...data,
      };
      setEmployees([...employees, newEmployee]);
      setIsSubmitted(true)
    }

    // Clear form fields
    setValue('id', '');
    setValue('name', '');
    setValue('email', '');
    setValue('role', '');
  };

  const onEditEmployee = (employee) => {
    // Populate form fields with employee data
    setValue('id', employee.id);
    setValue('name', employee.name);
    setValue('email', employee.email);
    setValue('role', employee.role);
  };

  const onDeleteEmployee = (employee) => {
    // Remove employee from list
    const updatedEmployees = employees.filter(
      (emp) => emp.email !== employee.email
    );
    setEmployees(updatedEmployees);
    setIsDeleted(false)
  };

  return (
    <div className='bg-gray-100'>
      <Navbar />
      <div class="max-w-[80rem] min-h-screen mx-auto mt-14">
        <form onSubmit={handleSubmit(onSubmit)} class="bg-white p-10 rounded-lg shadow mx-5 md:mx-0">
          <h1 class="text-xl md:text-2xl font-bold text-gray-700 uppercase mb-8">Create new Employee</h1>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="id">Employee ID</label>
            <input class="border rounded-lg py-2 px-3 w-full" type="text" placeholder="Employee ID" {...register('id')} />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="name">Name</label>
            <input class="border rounded-lg py-2 px-3 w-full" type="text" placeholder="Name" {...register('name')} />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="email">Email</label>
            <input class="border rounded-lg py-2 px-3 w-full" type="text" placeholder="Email" {...register('email')} />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="role">Role</label>
            <input class="border rounded-lg py-2 px-3 w-full" type="text" placeholder="Role" {...register('role')} />
          </div>
          <button type="submit" class="bg-green-500 text-white mt-6 py-2 px-7 rounded hover:bg-green-700">Save</button>
        </form>

        {isSubmitted && (
          <div class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-center justify-center mt-14">
              <div className="relative bg-green-50 rounded-lg text-center shadow-lg px-2">
                <div className="px-7 py-4">
                  <h2 className="text-lg font-medium text-gray-700">Employee created successfully!</h2>
                </div>
                <div className="absolute top-0 right-0 mt-2 mr-2">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => setIsSubmitted(false)}
                  >
                    <span className="sr-only">Close</span>
                    <FaTimes className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto mt-10 shadow rounded-lg mx-5 md:mx-0">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.id}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.name}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.email}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.role}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <button onClick={() => onEditEmployee(employee)} class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Edit</button>
                    <button onClick={() => setIsDeleted(true)} class="ml-3 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Delete</button>
                  </td>

                  {isDeleted && (
                    <div class="fixed z-10 inset-0 overflow-y-auto">
                      <div class="flex items-center justify-center m-14">
                        <div className="relative bg-red-100 rounded-lg text-center shadow-lg p-3">
                          <div className="px-7 py-4">
                            <h2 className="text-md font-medium text-gray-700">Are you sure you want to delete this employee?</h2>
                          </div>
                          <div class="flex justify-between mt-4">
                            <button
                              type="button"
                              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none"
                              onClick={() => setIsDeleted(false)}
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
                              onClick={() => onDeleteEmployee(employee)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
