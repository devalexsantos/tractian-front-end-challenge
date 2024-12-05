import logo from '../../assets/LOGO-TRACTIAN.svg';
import goldIcon from '../../assets/icons/gold.svg';
import { Company } from '../../types';
import { Link, useLocation } from 'react-router-dom';
import { CompanyButton } from './CompanyButton';
import { useContext } from 'react';
import { CompanyContext } from '../../contexts/CompanyContext';


export function HeaderLayout() {
  const { companies, isLoading } = useContext(CompanyContext);


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
