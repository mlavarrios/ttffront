import React from 'react';

interface Product {
  name: string;
  color: string;
  category: string;
  price: string;
}

const products: Product[] = [
  { name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', price: '$2999' },
  { name: 'Microsoft Surface Pro', color: 'White', category: 'Laptop PC', price: '$1999' },
  { name: 'Magic Mouse 2', color: 'Black', category: 'Accessories', price: '$99' },
];

const ProductTable: React.FC = () => {
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg bg-white p-6">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Nombre</th>
            <th scope="col" className="px-6 py-3">Apellido Paterno</th>
            <th scope="col" className="px-6 py-3">Apellido Materno</th>
            <th scope="col" className="px-6 py-3">Correo Electronico</th>
            <th scope="col" className="px-6 py-3">Contraseña</th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
              <td className="px-6 py-4">{product.color}</td>
              <td className="px-6 py-4">{product.category}</td>
              <td className="px-6 py-4">{product.price}</td>
              <td className="px-6 py-4">{product.category}</td>
              <td className="px-6 py-4 text-right">
                <a href="#" className="font-medium text-cyan-600 hover:underline p-1">Edit</a>
                <a href="#" className="font-medium text-cyan-600 hover:underlinec p-1">Eliminar</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
