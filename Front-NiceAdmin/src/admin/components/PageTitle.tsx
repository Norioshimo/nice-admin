import { Link } from "react-router";

interface PageTitleProps {
  title: string;
  breadcrumbItem: string[];
}

export const PageTitle = ({ title, breadcrumbItem }: PageTitleProps) => {
  return (
    <>
      <div className="pagetitle">
        <h1>{title}</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            {breadcrumbItem.map((bci, index) => (
              <li
                key={index}
                className={`breadcrumb-item ${
                  index === breadcrumbItem.length - 1 ? "active" : ""
                }`}
              >
                {bci}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </>
  );
};
