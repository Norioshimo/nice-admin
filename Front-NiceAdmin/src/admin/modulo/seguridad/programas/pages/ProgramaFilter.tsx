export const ProgramaFilter = () => {
  return (
    <>
      <div className="form-group col-12 col-sm-4 col-md-4 col-lg-3">
        <label htmlFor="bPROGRAMANOMBRE" className="col-form-label-sm">
          Nombre
        </label>
        <input
          style={{ width: "100%" }}
          type="text"
          className="form-control form-control-sm"
          id="bPROGRAMANOMBRE"
        />
      </div>
    </>
  );
};
