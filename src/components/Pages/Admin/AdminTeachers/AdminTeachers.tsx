import { Button } from "flowbite-react";
import ProductTable from "./TableTeacher";
const AdminTeachers: React.FC = () => {


  return (
    <div className="min-h-screen flex justify-center w-screen ">
      <div className="p-6 sm:ml-64 w-full">
        <div className="p-6 w-full">
          <p className="text-lg">Administrar perfiles de profesores</p>
        </div>
        <div className="w-full">
          <div className="w-full flex p-6 justify-end" >
            <Button className="bg-guinda">Agregar Profesor</Button>
          </div>
          <div className="overflow-x-auto">
            <ProductTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTeachers;