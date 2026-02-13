import type { RolesFilters } from "../interfaces";

 

interface RolFilterProps {
  filters: RolesFilters;
  setFilters: React.Dispatch<React.SetStateAction<RolesFilters>>;
}

export const RolFilter = ({
  filters,
  setFilters,
}: RolFilterProps) => {
  return (
    <>
      <div className="form-group col-12 col-sm-4 col-md-4 col-lg-3">
        <label htmlFor="bID" className="col-form-label-sm">
          ID
        </label>
        <input
          id="bID"
          style={{ width: "100%" }}
          type="number"
          className="form-control form-control-sm"
          value={filters.id ?? ""}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              id: e.target.value ? Number(e.target.value) : undefined,
            }))
          }
        />
      </div>

      <div className="form-group col-12 col-sm-4 col-md-4 col-lg-3">
        <label htmlFor="bROLNOMBRE" className="col-form-label-sm">
          Nombre
        </label>
        <input
          id="bROLNOMBRE"
          style={{ width: "100%" }}
          type="text"
          className="form-control form-control-sm"
          value={filters.nombre ?? ""}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              nombre: e.target.value || undefined,
            }))
          }
        />
      </div>
    </>
  );
};
