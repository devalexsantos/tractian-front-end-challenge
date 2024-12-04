import { useParams } from "react-router-dom";

export function Company() {
  const { id } = useParams();
  return <div>Company: {id}</div>;
}
