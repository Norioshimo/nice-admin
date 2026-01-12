interface Props {
  isPosting: boolean;
  texto: string;
}

export const Loading = ({ isPosting, texto }: Props) => {
  return <>
  {isPosting ? "Procesando..." : texto}
  </>;
};
