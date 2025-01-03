'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { useEffect, useState } from 'react';
import { columns } from './columns';
import { useEmployeeTableFilters } from './use-employee-table-filters';

export default function EmployeeTable({
  data,
  totalData
}: {
  data: any[];
  totalData: number;
}) {
  const { searchQuery, setPage, setSearchQuery } = useEmployeeTableFilters();
  const [filteredData, setFilteredData] = useState(data);

  // Filtrar os dados com base no searchQuery
  useEffect(() => {
    if (searchQuery) {
      const filtered = data.filter((item) =>
        item.nome.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data); // Resetar para os dados originais caso o searchQuery esteja vazio
    }
  }, [searchQuery, data]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          searchKey="nome"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        totalItems={filteredData.length}
      />
    </div>
  );
}