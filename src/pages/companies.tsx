import { getCompanies } from '../services/api';
import { useQuery } from '@tanstack/react-query';

export function Companies() {

  const { data: companies, isLoading, error } = useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
  })

  if (isLoading) return <p>Loading companies...</p>;
  if (error) return <p>Failed to load companies</p>;

  return (
    <div>
      <h1>Companies</h1>
      <ul>
        {companies?.map((company: any) => (
          <li key={company.id}>{company.name}</li>
        ))}
      </ul>
    </div>
  );
};
