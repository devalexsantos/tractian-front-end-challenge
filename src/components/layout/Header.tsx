import logo from '../../assets/LOGO-TRACTIAN.svg';
import goldIcon from '../../assets/icons/gold.svg';
import { useQuery } from '@tanstack/react-query';
import { getCompanies } from '../../services/api';
import { Company } from '../../types';
import { Link, useLocation } from 'react-router-dom';
import { CompanyButton } from './CompanyButton';


export function HeaderLayout() {
  const { data: companies, isLoading } = useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
  })

  const location = useLocation();


  return (
    <header className="flex justify-between p-4 bg-primary">

      <Link to="/">
        <img src={logo} alt="Tractian Logo" />
      </Link>

      <div className="flex gap-2.5 text-white">
        {
          isLoading ? <p>Loading companies...</p> : companies?.map((company: Company) => (
            <CompanyButton key={company.id} icon={goldIcon}
              variant={location.pathname.includes(company.id) ? 'primary' : 'secondary'}
              path={`/company/${company.id}`}
            >{company.name}</CompanyButton>
          ))
        }
      </div>
    </header>
  )

}
