import { useContext } from "react";
import NextPageBut from "./NextPageBut";
import PrevPageBut from "./PrevPageBut";
import { PageContext } from "../../App";

export default function IteratePages() {
  const { page } = useContext(PageContext);
  return (
    <>
      <PrevPageBut />
      <p className="page-iterator__container-current-page">{page}</p>
      <NextPageBut />
    </>
  );
}
