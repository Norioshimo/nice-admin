import type { ProgramasFilters } from "../interfaces";

interface ProgramaFilterProps {
  filters: ProgramasFilters;
  setFilters: React.Dispatch<React.SetStateAction<ProgramasFilters>>;
}

export const ProgramaFilter = ({
  filters,
  setFilters,
}: ProgramaFilterProps) => {
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
        <label htmlFor="bPROGRAMANOMBRE" className="col-form-label-sm">
          Nombre
        </label>
        <input
          id="bPROGRAMANOMBRE"
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
